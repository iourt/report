/**
 * 报表控件
 * 调用方式:
 * <view-charts ng-model="*"></view-charts>
 */
angular.module('Huijm')

.directive('viewCharts', function (
    $timeout,
    $window,
    $rootScope,
    widget
) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/charts.html',
        // controller: function ($scope, $element, $attrs) {},
        controller: function ($scope, $element, $attrs) {

            // 显示报表
            $scope.showCharts = function () {
                if ($scope.Page.View != 'photo') return;

                var options = {
                    chart: {
                        renderTo : 'chart',
                        type: 'line'
                    },
                    title: {
                        text: $scope.Page.TimeText,
                        align: 'right',
                        margin: 20,
                        style: {
                            fontSize: '12px',
                            color: '#999'
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
                    series: $scope.DataList.Charts
                };

                // angular.extend(options, {
                //     xAxis: {
                //         // categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
                //         type: 'datetime'
                //     },
                //     tooltip: {
                //         xDateFormat: "%A, %b %e, %Y %H:%M",
                //         shared: true
                //     },
                //     plotOptions: {
                //         series: {
                //             pointStart: Date.UTC(2015, 9, 14, 1),
                //             pointInterval: 60 * 60 * 1000
                //         }
                //     },
                //     series: $scope.DataList.Charts
                // });


                var charts = new Highcharts.Chart(options);
            }
        }
    };
});