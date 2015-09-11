angular.module('Huijm', [
    'ui.router',
    'ui.router.router',
    'DelegateEvents'
])
.config( function ($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('report', {
        abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
        url: '/report',
        templateUrl: 'code/tp/main.html',
    })

    //后台登录
    .state('report.login', {
        // cache: false,
        url: '/login.htm',
        templateUrl: 'code/tp/login.html',
        controller: 'tLogin'
    })

    //后台登录
    .state('report.index', {
        // cache: false,
        url: '/index.htm',
        templateUrl: 'code/tp/index.html',
        controller: 'tIndex'
    });



    // $urlRouterProvider.when('', '/index.htm');
    $urlRouterProvider.otherwise('/report/login.htm');

});
