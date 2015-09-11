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
    $rootScope,
    $window,
    widget
) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/menu_sub_bar.html',
        // controller: function ($scope, $element, $attrs) {},
        link: function ($scope, $element, $attrs) {
            $rootScope.PageName = {};

            widget.ajaxRequest({
                scope: $scope,
                url: 'getPageList',
                success: function (data) {
                    console.log(data);
                    angular.extend($rootScope.PageName, data);

                    console.log($rootScope.PageName);
                },
                error: function () {

                }
            });
        }
    };
});