var Huijm = angular.module('Huijm', [
    'ui.router',
    'ui.router.router',
    // 'highcharts-ng',
    'DelegateEvents'
]);

Huijm
.run( function (
    $rootScope,
    $location,
    $state,
    cachePool
) {
    $rootScope.showHeader = false;

    // 获取本地用户信息
    $rootScope.UserInfo = (function () {
        var UserInfo = cachePool.pull('UserInfo');

        if (!UserInfo) {
            UserInfo = { UserId: 0 };
        }

        return UserInfo;
    })();


    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.name == 'report.login') {
            $rootScope.showHeader = false;
            return;
        }

        if (!$rootScope.UserInfo || !$rootScope.UserInfo.Auth) {
            $rootScope.showHeader = false;
            event.preventDefault();
            $state.go('report.login', {from: fromState.name});
            return;
        } else {
            $rootScope.showHeader = true;
            // if (toState.name == 'report.login') {
            //     $state.go('report.index', {}, {
            //         reload: true
            //     });
            //     // $location.url('report/index.htm');
            // }
        }
    });
})
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
        url: '/count.htm?time',
        templateUrl: 'code/tp/count.html',
        controller: 'tCount'
    })

    // 分布数据
    .state('report.client', {
        // cache: false,
        url: '/client_{type}.htm?time',
        templateUrl: 'code/tp/client.html',
        controller: 'tClient'
    })


    // 模块分页
    .state('report.list', {
        url: '/list-{id}.htm?name',
        templateUrl: 'code/tp/page_list.html',
        controller: 'tPageList'
    })
    // 模块页面具体信息
    .state('report.detail', {
        url: '/detail-{mid}-{id}.htm',
        templateUrl: 'code/tp/page_detail.html',
        controller: 'tPageDetail'
    })

    // 下载量统计
    .state('report.download', {
        url: '/download.htm',
        templateUrl: 'code/tp/download.html',
        controller: 'tDownload'
    })
    // 注册统计
    .state('report.register', {
        url: '/register.htm',
        templateUrl: 'code/tp/register.html',
        controller: 'tRegister'
    })
    // 认证统计
    .state('report.certificate', {
        url: '/certificate.htm',
        templateUrl: 'code/tp/certificate.html',
        controller: 'tCertificate'
    })

    // 访问统计
    .state('report.visit', {
        url: '/visit.htm',
        templateUrl: 'code/tp/visit.html',
        controller: 'tVisit'
    })
    // 购买统计
    .state('report.shopping', {
        url: '/shopping.htm',
        templateUrl: 'code/tp/shopping.html',
        controller: 'tShopping'
    });



    // $urlRouterProvider.when('', '/index.htm');
    $urlRouterProvider.otherwise('/report/login.htm');

});
