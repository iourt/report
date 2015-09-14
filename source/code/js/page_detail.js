Huijm
.controller('tPageDetail', function (
    $scope,
    $rootScope
){
    $rootScope.showMenu = true;

    var charts = new Highcharts.Chart({
    // $('#chart').highcharts({
    // $scope.chartConfig = {
        chart: {
            renderTo : 'chart',
            type: 'line'
        },
        title: {
            text: '今天'
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
                text: '浏览量（PV）'
            }
        },
        credits:{
             enabled: false
        },

        series: [
            {
                name: '浏览量',
                data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
            }
        ]
    });




    $scope.CheckId = 1;
    $scope.setTab = function (e) {
        var $that = angular.element(e.delegationTarget);

        $scope.CheckId = $that.index() + 1;

        var charts = new Highcharts.Chart({
            chart: {
                renderTo : 'chart',
                type: 'line'
            },
            title: {
                text: '今天'
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
                    text: '浏览量（PV）'
                }
            },
            credits:{
                 enabled: false
            },

            series: [
                {
                    name: '浏览量',
                    data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
                }
            ]
        });
    };
});
