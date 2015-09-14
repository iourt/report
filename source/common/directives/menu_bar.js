angular.module('Huijm')

// 顶部菜单
.directive('menuBar', function (
    $window,
    $rootScope
) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/menu_bar.html',
        // controller: function ($scope, $element, $attrs) {},
        link: function ($scope, $element, $attrs) {
            $scope.MenuId = 1;

            $scope.subMenu = function (e) {
                var $that = angular.element(e.delegationTarget),
                    id = $that.attr('data-id');

                $scope.MenuId = id;
            };
        }
    };
});