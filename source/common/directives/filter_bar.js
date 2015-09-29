angular.module('Huijm')

// 筛选
.directive('filterBar', function (
    $window,
    $rootScope,
    widget
) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/filter_bar.html',
        // controller: function ($scope, $element, $attrs) {},
        link: function ($scope, $element, $attrs) {
			
			$scope.resetFilter = function (e) {
				var $that = angular.element(e.delegationTarget);
			};

			$scope.setFilter = function (e) {
				var $that = angular.element(e.delegationTarget);
			};
            //widget.ajaxRequest({
            //    scope: $scope,
            //    url: 'getPageModel',
            //    data: {},
            //    success: function (data) {
            //        $scope.PageList = data;
            //    }
            //})
        }
    };
});
