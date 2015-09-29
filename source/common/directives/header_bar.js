angular.module('Huijm')

// 顶部菜单
.directive('headerBar', function (
    $window,
    $rootScope,
    widget
) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/header_bar.html',
        // controller: function ($scope, $element, $attrs) {},
        link: function ($scope, $element, $attrs) {
            // $rootScope.HeaderTab = 1;

            $scope.setHeader = function (e) {
                var $that = angular.element(e.delegationTarget),
                    id = $that.attr('data-id');

                $rootScope.HeaderTab = id;

                switch ($rootScope.HeaderTab) {
                    case "1":
                        $rootScope.MenuId = 1;
                    break;

                    case "2":
                        $rootScope.MenuId = 4;
                    break;
                }
            };

            // 设置当前current
            // $scope.setCurrent = function (e) {
            //     var $that = angular.element(e.delegationTarget),
            //         $list = angular.element(document.querySelectorAll('.js_menu li'));

            //     $list.removeClass('current');

            //     $that.addClass('current');
            // };
            

            // widget.ajaxRequest({
            //     scope: $scope,
            //     url: 'getPageModel',
            //     data: {},
            //     success: function (data) {
            //         $scope.PageList = data;
            //     }
            // })
        }
    };
});