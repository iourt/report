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
    widget
) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/tab_time.html',
        // controller: function ($scope, $element, $attrs) {},
        link: function ($scope, $element, $attrs) {

            $scope.Filter = {};

            if ($attrs.right == 'show') {
                $element.find('.t_btn').css('display', '-webkit-box');
            } else {
                $element.find('.t_btn').css('display', 'none');
            }
            
            $scope.setTime = function (e) {
                var $that = angular.element(e.delegationTarget);

                $scope.Page.TimeType = $that.attr('data-type');
                $scope.Page.TimeText = $that.text();

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