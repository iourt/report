Huijm
.controller('tLogin', function (
    $scope,
    $rootScope,
    widget
){
    $rootScope.showHeader = false;

    $scope.tInput = {};

    $scope.toLogin = function () {
        if (!$scope.tInput.UserName) {
            widget.msgToast('请输入用户名！');
            return;
        }

        if (!$scope.tInput.Password) {
            widget.msgToast('请输入密码！')
            return;
        }

        widget.ajaxRequest({
            scope: $scope,
            url: 'getLogin',
            data: {},
            success: function (data) {
                $state.go('report.index');
            },
            error: function (res) {

            }
        });
    };
});
