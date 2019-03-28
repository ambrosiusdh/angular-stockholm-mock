'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'directiveApp',
    'oc.lazyLoad',
    'ui.router'
])
    .config([
        '$locationProvider',
        '$routeProvider',
        '$ocLazyLoadProvider',
        function($locationProvider, $routeProvider, $ocLazyLoadProvider) {
            $locationProvider.hashPrefix('!');
            $locationProvider.html5Mode(false);

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
                        'assets/js/user/login.js'
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
                })
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

    .controller('indexCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.checkPage = function () {
            return $location.path() !== '/login' && $location.path() !== '/warehouse';
        }
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