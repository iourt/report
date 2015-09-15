Huijm
.controller('tPageDetail', function (
    $scope,
    $rootScope
){
    $rootScope.showMenu = true;

    $scope.Page = {
        TimeId: 1,
        TimeText: '今天',
        CheckId: 1,
        CheckText: '浏览量(PV)',
        View: 'photo'
    };


    charts();   


    $scope.setTime = function (e) {
        var $that = angular.element(e.delegationTarget);

        $scope.Page.TimeId = $that.index() + 1;
        $scope.Page.TimeText = $that.text();

        charts();   
    };


    $scope.setTab = function (e) {
        var $that = angular.element(e.delegationTarget);

        $scope.Page.CheckId = $that.index() + 1;
        $scope.Page.CheckText = $that.text();

        charts();   
    };


    $scope.setView = function (e) {
        var $that = angular.element(e.delegationTarget);

        $scope.Page.X = (angular.element(document.querySelector('body')).width()-170)+'px';
        $scope.Page.View = $that.attr('data-type');

        charts();
    };


    function charts() {
        if ($scope.Page.View != 'photo') return;

        var charts = new Highcharts.Chart({
            chart: {
                renderTo : 'chart',
                type: 'line'
            },
            title: {
                text: $scope.Page.TimeText
            },
            xAxis: {
                // categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
                type: 'datetime'
            },
            tooltip: {
                xDateFormat: "%A, %b %e, %Y %H:%M",
                shared: true
            },

            plotOptions: {
                series: {
                    pointStart: Date.UTC(2015, 9, 14, 1),
                    pointInterval: 60 * 60 * 1000
                }
            },

            yAxis: {
                title: {
                    text: $scope.Page.CheckText
                }
            },
            credits:{
                 enabled: false
            },

            series: [
                {
                    name: $scope.Page.CheckText,
                    data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
                }
            ]
        });
    }
});
