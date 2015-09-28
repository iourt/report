Huijm
.controller('tClient', function (
    $scope,
    $rootScope,
    $stateParams,
    widget
){
    $rootScope.showMenu = true;

    $scope.Page = {
        TimeType: $stateParams.type ? $stateParams.type: 'today',
        TimeText: widget.getTimeText($stateParams.type)
    };


    function charts() {
        var charts = new Highcharts.Chart({
            chart: {
                renderTo : 'chart',
                type: 'line'
            },
            title: {
                text: $scope.Page.TimeText
            },
            xAxis: {
                categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            },
            yAxis: {
                title: {
                    text: $scope.Page.CheckText
                }
            },
            series: [
                {
                    name: $scope.Page.CheckText,
                    data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }
            ]
        });
    }
});
