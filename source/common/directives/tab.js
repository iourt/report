angular.module('Huijm')

.directive('tabIndex', function (
    $window,
    $rootScope,
    widget
) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/tab_index.html',
        // controller: function ($scope, $element, $attrs) {},
        link: function ($scope, $element, $attrs) {

            $scope.setTab = function (e) {
                var $that = angular.element(e.delegationTarget);

                $scope.Page.CheckType = $that.attr('data-type');
                $scope.Page.CheckText = $that.text();

                console.log($scope.Page);

                $scope.getData();
            };

        }
    };
})


// 详情页 筛选项
.directive('tabDetail', function (
    $window,
    $rootScope,
    widget
) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/tab_detail.html',
        // controller: function ($scope, $element, $attrs) {},
        link: function ($scope, $element, $attrs) {

            $scope.setTab = function (e) {
                var $that = angular.element(e.delegationTarget);

                $scope.Page.CheckType = $that.attr('data-type');
                $scope.Page.CheckText = $that.text();

                console.log($scope.Page);

                $scope.getData();
            };

        }
    };
})


.directive('tabTime', function (
    $window,
    $rootScope,
    widget,
    ShowTime
) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/tab_time.html',
        // controller: function ($scope, $element, $attrs) {},
        link: function ($scope, $element, $attrs) {

            // 这是时间选项
            $scope.Filter = {};

            if ($attrs.right == 'show') {
                $element.find('.t_btn').css('display', '-webkit-box');
            } else {
                $element.find('.t_btn').css('display', 'none');
            }
            
            /**
             * 根据点击选择的时间段来转换时间
             * today,yesterday,week,month
             */
            $scope.setTime = function (e) {
                var $that = angular.element(e.delegationTarget);

                $scope.Page.TimeType = $that.attr('data-type');
                $scope.Page.TimeText = $that.text();

                switch ($scope.Page.TimeType) {
                    case 'today':
                        $scope.Page.StartTime = ShowTime.getDay({
                            time: $scope.Page.Time
                        }).source;
                        $scope.Page.EndTime = ShowTime.getDay({
                            time: $scope.Page.Time
                        }).source;
                    break;

                    case 'yesterday':
                        $scope.Page.StartTime = ShowTime.getDay({
                            time: $scope.Page.Time,
                            day: -1
                        }).target;
                        $scope.Page.EndTime = ShowTime.getDay({
                            time: $scope.Page.Time,
                            day: -1
                        }).target;
                    break;

                    case 'week':
                        $scope.Page.StartTime = ShowTime.getDay({
                            time: $scope.Page.Time,
                            day: -6
                        }).target;
                        $scope.Page.EndTime = ShowTime.getDay({
                            time: $scope.Page.Time,
                            day: -6
                        }).source;
                    break;

                    case 'month':
                        $scope.Page.StartTime = ShowTime.getDay({
                            time: $scope.Page.Time,
                            day: -29
                        }).target;
                        $scope.Page.EndTime = ShowTime.getDay({
                            time: $scope.Page.Time,
                            day: -29
                        }).source;
                    break;
                };

                $scope.getData();
            };

            $scope.setTimeFilter = function (e) {
                var $that = angular.element(e.delegationTarget);

                $scope.Filter.Type = $that.attr('data-type');
            };

        }
    };
})


.directive('tabView', function (
    $window,
    $rootScope,
    widget
) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/tab_view.html',
        // controller: function ($scope, $element, $attrs) {},
        link: function ($scope, $element, $attrs) {
            
            $scope.setView = function (e) {
                var $that = angular.element(e.delegationTarget);

                $scope.Page.X = (angular.element(document.querySelector('body')).width()-170)+'px';
                $scope.Page.View = $that.attr('data-type');

                $scope.getData();
            };

        }
    };
});