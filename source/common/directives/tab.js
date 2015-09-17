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

                // $scope.getData();
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

                // $scope.getData();
            };

        }
    };
});