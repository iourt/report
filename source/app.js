var Huijm = angular.module('Huijm', [
    'ui.router',
    'ui.router.router',
    'highcharts-ng',
    'DelegateEvents'
]);

Huijm
.config( function ($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('report', {
        abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
        url: '/report',
        templateUrl: 'code/tp/main.html',
    })

    // 后台登录
    .state('report.login', {
        // cache: false,
        url: '/login.htm',
        templateUrl: 'code/tp/login.html',
        controller: 'tLogin'
    })

    // 概况数据
    .state('report.index', {
        // cache: false,
        url: '/index.htm',
        templateUrl: 'code/tp/index.html',
        controller: 'tIndex'
    })

    // 统计数据
    .state('report.count', {
        // cache: false,
        url: '/count.htm?type',
        templateUrl: 'code/tp/count.html',
        controller: 'tCount'
    })


    // 模块分页
    .state('report.page-list', {
        url: '/page-list-{id}.htm?name',
        templateUrl: 'code/tp/page_list.html',
        controller: 'tPageList'
    })
    // 模块页面具体信息
    .state('report.page-detail', {
        url: '/page-detail-{id}.htm',
        templateUrl: 'code/tp/page_detail.html',
        controller: 'tPageDetail'
    });



    // $urlRouterProvider.when('', '/index.htm');
    $urlRouterProvider.otherwise('/report/index.htm');

});
