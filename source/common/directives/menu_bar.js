angular.module('Huijm')

// 顶部菜单
.directive('headerBar', function (
    $window,
    $rootScope
) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/menu_bar.html',
        // controller: function ($scope, $element, $attrs) {},
        link: function ($scope, $element, $attrs) {
            $rootScope.Header = {
                subMenu: 'web' // 默认显示网站管理
            };

            $scope.showSubmenu = function (type) {
                $rootScope.Header.subMenu = type;
            };
        }
    };
})


// 子菜单
.directive('menuBar', function (
    $window
) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/menu_sub_bar.html',
        // controller: function ($scope, $element, $attrs) {},
        link: function ($scope, $element, $attrs) {
        }
    };
});