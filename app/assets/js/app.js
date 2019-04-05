'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap',
    'oc.lazyLoad',
    'directiveApp',
    'LocalStorageModule',
    'AuthenticationController'
])


    .config([
        '$locationProvider',
        '$routeProvider',
        '$ocLazyLoadProvider',
        'localStorageServiceProvider',
        function($locationProvider, $routeProvider, $ocLazyLoadProvider, localStorageServiceProvider) {
            $locationProvider.hashPrefix('!');
            $locationProvider.html5Mode(false);

            localStorageServiceProvider.setStorageType('sessionStorage');

            $ocLazyLoadProvider.config({
                modules: {
                    name: 'dashboardLoad',
                    files: [
                        'assets/js/dashboard/dashboard.js'
                    ]
                }
            });

            $ocLazyLoadProvider.config({
                modules: {
                    name: 'warehouseOrderLoad',
                    files: [
                        'assets/js/dashboard/warehouse-order.js'
                    ]
                }
            });

            $ocLazyLoadProvider.config({
                modules: {
                    name: 'asnLoad',
                    files: [
                        'assets/js/receiving/asn.js',
                        'lib/daterangepicker/daterangepicker.css',
                        'lib/daterangepicker/daterangepicker.js'
                    ]
                }
            });

            $ocLazyLoadProvider.config({
                modules: {
                    name: 'incomingGoodsLoad',
                    files: [
                        'assets/js/receiving/incoming-goods.js'
                    ]
                }
            });

            $ocLazyLoadProvider.config({
                modules: {
                    name: 'loadingDockLoad',
                    files: [
                        'assets/js/receiving/loading-dock.js'
                    ]
                }
            });

            $ocLazyLoadProvider.config({
                modules: {
                    name: 'loginLoad',
                    files: [
                        'assets/js/user/login.js',
                        'assets/js/warehouse/warehouse.js',
                        'lib/angular-md5/angular-md5.js'
                    ]
                }
            });

            $ocLazyLoadProvider.config({
                modules: {
                    name: 'warehouseLoad',
                    files: [
                        'assets/js/warehouse/warehouse.js'
                    ]
                }
            });

            $routeProvider.when('/dashboard', {
                    templateUrl: 'view/dashboard/dashboard.html',
                    controller: 'dashboardCtrl',
                    resolve: {
                        loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('dashboardLoad');
                        }]
                    }
                });
            $routeProvider.when('/warehouse-order', {
                    templateUrl: 'view/dashboard/warehouse-order.html',
                    controller: 'warehouseOrderCtrl',
                    resolve: {
                        loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('warehouseOrderLoad');
                        }]
                    }
                });
            $routeProvider.when('/asn',{
                templateUrl: 'view/receiving/asn.html',
                controller: 'asnCtrl',
                resolve: {
                    loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('asnLoad');
                    }]
                }
            });
            $routeProvider.when('/incoming-goods',{
                templateUrl: 'view/receiving/incoming-goods.html',
                controller: 'incomingGoodsCtrl',
                resolve: {
                    loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('incomingGoodsLoad');
                    }]
                }
            });
            $routeProvider.when('/loading-dock',{
                templateUrl: 'view/receiving/loading-dock.html',
                controller: 'loadingDockCtrl',
                resolve: {
                    loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('loadingDockLoad');
                    }]
                }
            });
            $routeProvider.when('/login',{
                controller: 'loginCtrl',
                templateUrl: 'view/user/login.html',
                resolve: {
                    loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('loginLoad');
                    }]
                }
            });

            $routeProvider.when('/warehouse', {
                controller: 'warehouseCtrl',
                templateUrl: 'view/warehouse/warehouse.html',
                resolve:{
                    loadDependencies: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('warehouseLoad')
                    }]
                }
            });

            $routeProvider.otherwise({redirectTo: '/dashboard'});
        }
    ])

    .controller('indexCtrl',
        [
            '$scope',
            '$location',
            '$http',
            'localStorageService',
            'authenticationFactory',
            function ($scope,
                      $location,
                      $http,
                      localStorageService,
                      authenticationFactory) {

            $scope.checkPage = function () {
                return $location.path() !== '/login' && $location.path() !== '/warehouse';
            };

            $scope.userName = localStorageService.get('name');

            if(localStorageService.get('warehouse') !== undefined) {
                $scope.warehouseSelect = localStorageService.get('warehouse');
                $scope.userRole = localStorageService.get('userRole');
            }

            $scope.checkUserRole = function(sideBar){
                if(localStorageService.get('userRole') !== undefined){
                    if(sideBar === 'admin' && localStorageService.get('userRole') === 1)
                        return true;
                    else return sideBar === 'member' && localStorageService.get('userRole') === 2;
                }
            };

            $scope.logout = function () {
                authenticationFactory.logout();
            };

            $scope.warehouseList = [];
            $http.get('http://localhost:8080/warehouse')
                .then(function (response) {
                    response.data.forEach(function (item, index) {
                        $scope.warehouseList.push(item.warehouseName);
                    })
                });

            $scope.initializeWarehouse = function(){
                $scope.userName = localStorageService.get('name');
                localStorageService.set('warehouse', this.warehouseSelect);
                $scope.warehouseSelect = localStorageService.get('warehouse');
                $scope.changeWarehouse();
                $location.path('/dashboard');
            };

            $scope.changeWarehouse = function () {
                if ($scope.warehouseSelect === "--Pilih Warehouse--")
                    return;

                $scope.apiData = {
                    userId: localStorageService.get('userId'),
                    warehouseName: $scope.warehouseSelect
                };

                $http.post(
                    'http://localhost:8080/warehouse-role/authenticate',
                    $scope.apiData)
                        .then(function (response) {
                            console.log(response);
                            localStorageService.set('warehouse', $scope.warehouseSelect);
                            localStorageService.set('userRole',
                                response.data.userRole.userRoleId);

                        });
            };
    }]);

//JQuery
var currExpandClass;

function expandList (className) {
    if(currExpandClass === className) {
        $('.' + className + ' .list__menu').slideToggle();
        $('.' + className + ' .side-bar--expand').toggleClass('side-bar--expand-rotate');
    }else {
        $('.list__menu').slideUp();
        $('.side-bar--expand').removeClass('side-bar--expand-rotate');
        $('.' + className + ' .list__menu').slideToggle();
        $('.' + className + ' .side-bar--expand').toggleClass('side-bar--expand-rotate');
    }
    currExpandClass = className;
}