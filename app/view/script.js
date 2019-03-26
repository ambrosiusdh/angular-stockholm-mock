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
                $scope.totalItems = $scope.dataset.length
            })
        $scope.dateNow = new Date()
        $scope.paginationPage = [5,10,25,50]
        $scope.pagination = $scope.paginationPage[0]
        $scope.inventoryType = [
            'Semua',
            'Purchase Order',
            'Consignment Final',
            'Inventory Request'
        ]
        $scope.asnType = $scope.inventoryType[0];
        $scope.status = [
            'Semua',
            'Created',
            'Closed'
        ]
        $scope.asnStatus = $scope.status[1]
        $scope.currentPage = 1
        $scope.itemsPerPage = 5
        $scope.maxSize = 100
        $scope.findAllByAsnNumber = function () {
            $http.get('http://localhost:8080/asn/findAllByAsnNumber/' + $scope.asnNumber)
                .then(function (response) {
                    $scope.dataset = response.data
                    $scope.totalItems = $scope.dataset.length
                })
        }
        $scope.findAllByAsnReference = function () {
            $http.get('http://localhost:8080/asn/findAllByAsnReference/' + $scope.asnReference)
                .then(function (response) {
                    $scope.dataset = response.data
                    $scope.totalItems = $scope.dataset.length
                })
        }
        $scope.findAllByAsnSupplier= function () {
            $http.get('http://localhost:8080/asn/findAllByAsnSupplier/' + $scope.asnSupplier)
                .then(function (response) {
                    $scope.dataset = response.data
                    $scope.totalItems = $scope.dataset.length
                })
        }
        $scope.findAllByAsnType= function () {
            $http.get('http://localhost:8080/asn/findAllByAsnType/' + $scope.asnType)
                .then(function (response) {
                    $scope.dataset = response.data
                    $scope.totalItems = $scope.dataset.length
                })
        }
        $scope.findAllByAsnStatus= function () {
            $http.get('http://localhost:8080/asn/findAllByAsnStatus/' + $scope.asnStatus)
                .then(function (response) {
                    $scope.dataset = response.data
                    $scope.totalItems = $scope.dataset.length
                })
        }
    }])
    .directive('customPagination', function () {
        return {
            template: '    <ul uib-pagination total-items="totalItems" ng-model="currentPage" max-size="maxSize" class="pagination-sm" boundary-links="true" force-ellipses="true" items-per-page="itemsPerPage"></ul>',
            restrict: "EA"
        }
    })


