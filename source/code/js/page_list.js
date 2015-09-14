Huijm
.controller('tIndex', function (
    $scope,
    $rootScope
){
    $rootScope.showMenu = true;

    $('#chart').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: '今天'
        },
        xAxis: {
            categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
            title: {
                text: '浏览值'
            }
        },
        // plotOptions: {
        //     line: {
        //         dataLabels: {
        //             enabled: true
        //         },
        //         enableMouseTracking: false
        //     }
        // },
        series: [
            {
                name: '浏览量',
                data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }
        ]
    });
});
