angular.module('Huijm')

// 顶部菜单
.directive('menuBar', function (
    $window,
    $rootScope,
    widget
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

            // 设置当前current
            $scope.setCurrent = function (e) {
                var $that = angular.element(e.delegationTarget),
                    $list = angular.element(document.querySelectorAll('.js_menu li'));

                $list.removeClass('current');

                $that.addClass('current');
            };
            

            widget.ajaxRequest({
                scope: $scope,
                url: 'getPageModel',
                data: {},
                success: function (data) {
                    $scope.PageList = data;
                }
            })
        }
    };
});