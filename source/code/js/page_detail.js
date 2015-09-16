Huijm
.controller('tPageDetail', function (
    $scope,
    $rootScope,
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

    // 构造数据结构
    $scope.DataList = {
        List: {},
        Charts: []
    };

    // 进入页面获取数据
    getData(); 

    $scope.setTime = function (e) {
        var $that = angular.element(e.delegationTarget);

        $scope.Page.TimeType = $that.attr('data-type');
        $scope.Page.TimeText = $that.text();

        getData();
    };


    $scope.setTab = function (e) {
        var $that = angular.element(e.delegationTarget);

        $scope.Page.CheckType = $that.attr('data-type');
        $scope.Page.CheckText = $that.text();

        getData(); 
    };


    $scope.setView = function (e) {
        var $that = angular.element(e.delegationTarget);

        $scope.Page.X = (angular.element(document.querySelector('body')).width()-170)+'px';
        $scope.Page.View = $that.attr('data-type');

        getData();
    };


    function getData() {
        if ($scope.Page.CheckType == 'btn') {
            widget.ajaxRequest({
                scope: $scope,
                url: 'getDetailButton',
                data: {
                    Time: $scope.Page.TimeType
                },
                success: function (data) {
                    $scope.DataList.Charts = [];

                    angular.forEach(data.List, function (v, k) {
                        $scope.DataList.Charts.push({
                            name: v.Id,
                            data: v.Data
                        });
                    });

                    charts();
                }
            });
        }

        if ($scope.Page.CheckType != 'btn') {
            widget.ajaxRequest({
                scope: $scope,
                url: 'getDetailData',
                data: {
                    Time: $scope.Page.TimeType
                },
                success: function (data) {
                    console.log(data);
                    $scope.DataList.List = data.List;

                    var type = widget.getCheckType($scope.Page.CheckType);
                    $scope.DataList.Charts = [
                        {
                            name: $scope.Page.CheckText,
                            data: data.List[type]
                        }
                    ];

                    charts();
                }
            });
        }
    }


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

            series: $scope.DataList.Charts
        });
    }
});

/*



*/
