Huijm
.controller('tIndex', function (
    $scope,
    $rootScope,
    $stateParams,
    showtime,
    widget
){
    $rootScope.showMenu = true;

    $scope.Page = {
        TimeType: 'today',
        TimeText: '今天',
        CheckType: 'pv',
        CheckText: '浏览量(PV)',
        View: 'photo'
    };
    

    $scope.getData = function () {
        // widget.ajaxRequest({
        //     scope: $scope,
        //     url: 'getIndexData',
        //     data: {
        //         Time: $scope.Page.TimeType
        //     },
        //     success: function (data) {
        //         $scope.DataList.List = data.List;

        //         var type = widget.getCheckType($scope.Page.CheckType);

        //         $scope.DataList.Charts = [
        //             {
        //                 name: $scope.Page.CheckText,
        //                 data: data.List[type]
        //             }
        //         ];

        //         charts();
        //     }
        // });

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

            // series: $scope.DataList.Charts
            series: [
                {
                    name: $scope.Page.CheckText,
                    data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }
            ]
        });
    }



    $scope.getData();




    // var charts = new Highcharts.Chart({
    // // $('#chart').highcharts({
    //     chart: {
    //         renderTo : 'chart',
    //         type: 'line'
    //     },
    //     title: {
    //         text: '今天'
    //     },
    //     xAxis: {
    //         categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    //     },
    //     yAxis: {
    //         title: {
    //             text: '浏览值'
    //         }
    //     },
    //     // plotOptions: {
    //     //     line: {
    //     //         dataLabels: {
    //     //             enabled: true
    //     //         },
    //     //         enableMouseTracking: false
    //     //     }
    //     // },
    //     series: [
    //         {
    //             name: '浏览量(PV)',
    //             data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    //         }
    //     ]
    // });


    // $scope.setTab = function (e) {
    //     var $that = angular.element(e.delegationTarget);

    //     $scope.CheckId = $that.index() + 1;
    //     // alert($that.index());
    //     // $that.addClass('checked');
    //     // charts.series[0].name = $that.text();

    //     var charts = new Highcharts.Chart({
    //     // $('#chart').highcharts({
    //         chart: {
    //             renderTo : 'chart',
    //             type: 'line'
    //         },
    //         title: {
    //             text: '今天'
    //         },
    //         xAxis: {
    //             categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    //         },
    //         yAxis: {
    //             title: {
    //                 text: '浏览值'
    //             }
    //         },
    //         // plotOptions: {
    //         //     line: {
    //         //         dataLabels: {
    //         //             enabled: true
    //         //         },
    //         //         enableMouseTracking: false
    //         //     }
    //         // },
    //         series: [
    //             {
    //                 name: $that.text(),
    //                 data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    //             }
    //         ]
    //     });
    // };
});
