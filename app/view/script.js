'use strict';

angular.module('myApp.view', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'view/index.html'
        }),
        $routeProvider.when('/dashboard', {
           templateUrl: 'view/dashboard/dashboard.html',
            controller: 'dashboardCtrl'
        }),
        $routeProvider.when('/warehouse-order', {
            templateUrl: 'view/dashboard/warehouse-order.html',
            controller: 'warehouseOrderCtrl'
        }),
        $routeProvider.when('/asn',{
            templateUrl: 'view/receiving/asn.html',
            controller: 'asnCtrl'
        })
}])
    .controller('indexCtrl', ['$scope', function ($scope) {
        $scope.test = 'test'
    }])
    .controller('dashboardCtrl', ['$scope', function ($scope) {
        $scope.inboundPending = 49789
        $scope.inboundDone = 4085
        $scope.outboundPending = 5028
        $scope.outboundDone = 480
        $scope.date = new Date()
        $scope.checkAmount = function(){
            return $scope.inboundPending > 0 ? 'inbound__amount-warning' : ''
        }
    }])
    .controller('warehouseOrderCtrl', ['$scope', '$http', function ($scope, $http) {
        $http.get('http://localhost:8080/warehouse')
            .then(function (response) {
                $scope.dataset = response.data
            })
        $scope.date = new Date()
    }])
    .controller('asnCtrl', ['$scope', '$http', function ($scope, $http) {
        $http.get('http://localhost:8080/asn')
            .then(function (response) {
                $scope.dataset = response.data
            })
        $scope.date = new Date()
    }])


