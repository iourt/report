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
            // $rootScope.MenuId = 1;


            $scope.setMenu = function (e) {
                var $that = angular.element(e.delegationTarget),
                    id = $that.attr('data-id');

                $rootScope.MenuId = id;
            };

            $scope.setMenuDetail = function (e) {
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