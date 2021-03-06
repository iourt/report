angular.module('Huijm')

.factory('widget', function(
    $q,
    $http,
    $state,
    $compile,
    $timeout,
    $location,
    $rootScope,
    $cacheFactory,

    cachePool
) {

    // 获取本地用户信息
    $rootScope.UserInfo = (function () {
        var UserInfo = cachePool.pull('UserInfo');

        if (!UserInfo) {
            UserInfo = { UserId: 0 };
        }

        return UserInfo;
    })();


    var toastTimer = null,
        dataPool = $cacheFactory('dataPool');

    var tPackage = {
        config: function () {
            var obj = {
                apiSocket: 'http://localhost:3000/api/'
                // apiSocket: 'api/'
            };

            return obj;
        },

        /**
         * toast提示层
         * @param msg, time
         */
        msgToast: function (msg, time) {
            var toastDom = angular.element(document.querySelector('.notifier'));

            if (!toastDom.length) {
                var toastTpl = $compile('<div class="notifier" ng-click="notification=null" ng-show="notification"><span>{{notification}}</span></div>');
                angular.element(document.getElementsByTagName('body')[0]).append(toastTpl($rootScope));
            }

            $timeout(function() {
                $rootScope.notification = msg;
            }, 0);

            $timeout.cancel(toastTimer);

            toastTimer = $timeout(function() {
                $rootScope.notification = '';
            }, time || 2000);

        },

        /**
         * 数据缓存 所有缓存都在数据池里操作
         * @param key
         * @param data 如果data不存在，则为取缓存，如果存在，则重写key的值
         */
        cacheData: function (key, data) {

            if (!angular.isString(key)) {
                return false;
            }

            var tmpCache = dataPool.get(key);

            if (data) {
                dataPool.put(key, data); //缓存数据
            } else {
                return tmpCache ? tmpCache : false;
            }
        },

        /**
         * 安全的使用angular apply方法，以保证不会因为产生循环调用而抛出“$digest already in progress”
         * @param scope
         * @param fn
         */
        safeApply: function (scope, fn) {
            if (!scope || !fn) {
                return;
            }
            if (scope.$$phase || (scope.$root && scope.$root.$$phase)) {
                fn();
            } else {
                scope.$apply(fn);
            }
        },
        
        /**
         * ajax请求
         */
        ajaxRequest: function (params) {
            var self = this;

            if (!params) return;

            var $scope = params.scope || '',
                postOpt = params.data || {},
                obj = {
                    Header: {
                        UserId: '',
                        Auth: ''
                    }
                };
                // UserInfo = cachePool.pull('UserInfo');

            if (!$scope.Page) {
                $scope.Page = {};
            };

            if ($rootScope.UserInfo && $rootScope.UserInfo.UserId) {
                obj.Header.UserId = $rootScope.UserInfo.UserId;
                obj.Header.Auth = $rootScope.UserInfo.Auth;
            }

            postOpt = angular.extend({}, postOpt, obj);
            //--数据改造加用户信息end

            if (params.showPage) {

                if ($scope.Page.isLoading) return;

                $scope.Page.isLoading = true;
                $scope.Page.pageIndex++;

                angular.extend(postOpt, {
                    PageIndex: $scope.Page.pageIndex,
                    PageSize: $scope.Page.pageSize
                });
            }

            var options = {
                    success     : function() {}, //--成功回调
                    // msgError : // 错误提示
                    error       : function() {}, //------错误回调
                    showPage    : false, //----------是否启用分页功能
                    showLoading : true, //-----------是否显示loading
                    isLogin     : false, //----------需要登录的接口屏蔽error 错误提示
                    // isPopup  : false, //----------请求结果是否有popup
                    isAckError  : true //------------Respone.Ack=Failure时是否显示错误信息
                },
                ajaxConfig = { //-----------------ajax请求配置
                    method: 'POST',
                    url: self.config().apiSocket + params.url || '',

                    // method: 'GET',
                    // url: self.config().apiSocket + params.url + '.json' || '',

                    data: postOpt,
                    timeout: 15000
                };

            for (var i in params) options[i] = params[i];

            $http(ajaxConfig).success(function(data) {

                if (!data.Response.State) console.log('用户没有登录');

                if (data.Response && data.Response.Ack == "success") {

                    if (typeof options.success === 'function') {
                        options.success(data);
                    }

                    $scope.Page.Time = Response.Time;

                } else {

                    if (options.isError) {
                        if (options.msgError) {
                            self.msgToast(options.msgError);
                        } else {
                            self.msgToast('数据请求错误！');
                        }
                    }

                }

            }).error(function(data) {
                if (!options.isLogin) {
                    if (typeof options.error === 'function') {
                        options.error(data);
                    } else {
                        self.msgToast('网络错误，请稍后再试！');
                    }
                }
				
				options.error(data);

            });

        },

        /**
         * 设置登录信息
         * UserInfo {
         *     UserId:    用户ID
         *     Auth:      Auth
         * }
         */
        setLogin: function (data) {
            var self = this;
                    
            cachePool.push('UserInfo', {
                UserId: data.UserId,
                Auth:   data.Auth
            }, 1); // 缓存1天

            $rootScope.UserInfo = cachePool.pull('UserInfo');
        },

        /**
         * 注销用户登录信息
         */
        cleanLogin: function () {
            cachePool.remove("UserInfo");
            
            $rootScope.UserInfo = { UserId: 0 };
        },

        /**
         * 日期筛选转换Title
         */
        getTimeText: function (type) {
            var text = "今天";

            switch (type) {
                case 'today':
                    text = "今天";
                break;

                case 'yesterday':
                    text = "昨天";
                break;

                case 'week':
                    text = "最近7天";
                break;

                case 'month':
                    text = "最近30天";
                break;
            }

            return text;
        },

        /**
         * 转换统计类型，取数据库数据（字段匹配）
         */
        getCheckType: function (type) {
            switch (type) {
                case 'pv':
                    type = 'Pv';
                break;

                case 'uv':
                    type = 'Uv';
                break;

                case 'ip':
                    type = 'Ip';
                break;

                case 'stop':
                    type = 'Stop';
                break;

                case 'page':
                    type = 'Page';
                break;
            }

            return type;
        }
    };


    /**
     * 重写angular的param方法，使angular使用jquery一样的数据序列化方式  The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var paramObj = function (obj) {
        var query = '',
            name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += paramObj(innerObj) + '&';
                }
            } else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += paramObj(innerObj) + '&';
                }
            } else if (value !== undefined && value !== null) {
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    return tPackage;
});
