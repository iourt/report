angular.module('Huijm')

// 筛选
.directive('filterBar', function (
    $window,
    $rootScope,
    widget
) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/filter_bar.html',
        // controller: function ($scope, $element, $attrs) {},
        link: function ($scope, $element, $attrs) {
            // {
            //     type:
            //     id:
            //     name:
            // }
            $scope.Filter = [];
            $scope.FilterPage = $attrs.type;
			
			$scope.resetFilter = function (e) {
				var $that = angular.element(e.delegationTarget);

                var text  = $that.attr('data-text'),
                    id    = $that.attr('data-id'),
                    type  = $that.attr('data-type');

                angular.forEach($scope.Filter, function (v, k) {
                    if (v.type == type && v.id==id) {
                        $scope.Filter.splice(k, 1);
                        var elem = $element.find('dd li');

                        angular.forEach(elem, function (item, key) {
                            var el = elem[key];
                            if (el.className=='current' && el.dataset['id']==id && el.dataset['text']==text && el.dataset['type']==type){
                                el.className = '';
                            }
                        });
                    }
                });
			};

			$scope.setFilter = function (e) {
				var $that = angular.element(e.delegationTarget);

                var key,
                    state = false,
                    text  = $that.attr('data-text'),
                    id    = $that.attr('data-id'),
                    type  = $that.attr('data-type'),
                    obj   = {type: type, id: id, text: text};

                $that.parent().find('li').removeClass('current');
                $that.addClass('current');

                if ($scope.Filter.length > 0) {
                    angular.forEach($scope.Filter, function (v, k) {
                        if (v.type == type) {
                            key = k;
                            state = true;
                        }
                    });

                    if (state) {
                        $scope.Filter[key] = obj;
                    } else {
                        $scope.Filter.push(obj)
                    }
                } else {
                    $scope.Filter.push({
                        type: type,
                        id: id,
                        text: text
                    });
                }
			};
            //widget.ajaxRequest({
            //    scope: $scope,
            //    url: 'getPageModel',
            //    data: {},
            //    success: function (data) {
            //        $scope.PageList = data;
            //    }
            //})
        }
    };
});
