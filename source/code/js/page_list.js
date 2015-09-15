Huijm
.controller('tPageList', function (
    $scope,
    $rootScope,
    $stateParams,
    widget
){
    $rootScope.showMenu = true;

    $scope.Page = {
        Title: $stateParams.name
    };

    widget.ajaxRequest({
        scope: $scope,
        url: 'getPageList',
        data: {
            Id: parseInt($stateParams.id, 0)
        },
        success: function (data) {
            $scope.DataList = data;
        },
        error: function (error) {

        }
    });
});
