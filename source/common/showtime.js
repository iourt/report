angular.module('Huijm')

.factory('ShowTime', function(
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
    var tShowTime = {
        /**
         * 向前多少天
         * @params:
         * time: 1442543369234
         * day: 1
         * type: 返回的格式
         *     1: 2015-1-1
         *     2: 2015-01-01
         */
        getDay: function (params) {
            var self = this;

            var obj = {
                    time: params.time || new Date().getTime(),
                    day: params.day || 0,
                    type: params.type || 1
                },
                tTime = {};

            var source = self._timeObj({
                    time: obj.time,
                    type: obj.type
                }),
                target = self._timeObj({
                    time: obj.time,
                    day:  obj.day,
                    type: obj.type
                });

            return {
                source: source,
                target: target
            };
        },

        /**
         * @params:
         * time: 1442543369234
         * day: 0
         * type: 1
         */
        _timeObj: function (params) {
            var self = this;

            var obj = {
                time: params.time,
                day: params.day || 0,
                type: params.type || 1
            };

            var space = obj.day * 24 * 60 * 60 * 1000 + obj.time,
                time = new Date(space);

            var result = self._timeType({
                time: {
                    year:   time.getFullYear(),
                    month:  time.getMonth() + 1,
                    date:   time.getDate(),
                    hour:   time.getHours(),
                    minute: time.getMinutes(),
                    second: time.getSeconds()
                },
                type: obj.type
            });

            return result;
        },

        /**
         * @params:
         * type: 返回的格式
         *     1: 2015-1-1
         *     2: 2015-01-01
         */
        _timeType: function (params) {
            var self = this;

            var obj = {
                    time: params.time,
                    type: params.type || 1
                },
                result;

            switch (obj.type) {
                case 2:
                    result = obj.time.year +'-'+ self._addZero(obj.time.month) +'-'+ self._addZero(obj.time.date);
                break;

                default:
                    result = obj.time.year +'-'+ obj.time.month +'-'+ obj.time.date;
            }

            return result;
        },

        _addZero: function (num) {
            var result = num;

            if (num < 10) {
                result = 0 + num.toString();
            }

            return result;
        }
    };

    // var a = tShowTime.getDay({
    //     time: 1442543369234,
    //     day: 1,
    //     type: 2
    // });

    // console.log(a);

    return tShowTime;
});
