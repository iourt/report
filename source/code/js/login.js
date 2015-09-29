Huijm
.controller('tLogin', function (
    $scope,
    $rootScope,
    widget
){
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

        // 测试用 toDo
        widget.setLogin({
            UserId: 1,
            Auth: "EWED4494LFOFDF84834BCD8343"
        });

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
