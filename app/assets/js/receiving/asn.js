'use strict';

angular.module('controller.receiving.AsnController', ['AuthenticationController'])

    .controller('asnCtrl', ['$scope', '$http', 'authenticationFactory', function ($scope, $http, authenticationFactory) {
        authenticationFactory.authenticateLogin();
        $http.get('http://localhost:8080/asn')
            .then(function (response) {
                $scope.dataset = response.data;
                $scope.totalItems = $scope.dataset.length;
            });
        $scope.dateNow = new Date();
        $scope.paginationPage = [5,10,25,50];
        $scope.pagination = $scope.paginationPage[0];
        $scope.inventoryType = [
            'Semua',
            'Purchase Order',
            'Consignment Final',
            'Inventory Request'
        ];
        $scope.asnType = $scope.inventoryType[0];
        $scope.status = [
            'Semua',
            'Created',
            'Closed'
        ];
        $scope.asnStatus = $scope.status[1];
        $scope.currentPage = 1;
        $scope.itemsPerPage = 5;
        $scope.maxSize = 100;
        $scope.findAllByAsnNumber = function () {
            $http.get('http://localhost:8080/asn/findAllByAsnNumber/' + $scope.asnNumber)
                .then(function (response) {
                    $scope.dataset = response.data;
                    $scope.totalItems = $scope.dataset.length;
                })
        };
        $scope.findAllByAsnReference = function () {
            $http.get(
                'http://localhost:8080/asn/findAllByAsnReference/' + $scope.asnReference)
                .then(function (response) {
                    $scope.dataset = response.data;
                    $scope.totalItems = $scope.dataset.length;
                })
        }
        $scope.findAllByAsnSupplier= function () {
            $http.get('http://localhost:8080/asn/findAllByAsnSupplier/' + $scope.asnSupplier)
                .then(function (response) {
                    $scope.dataset = response.data;
                    $scope.totalItems = $scope.dataset.length;
                })
        }
        $scope.findAllByAsnType= function () {
            $http.get('http://localhost:8080/asn/findAllByAsnType/' + $scope.asnType)
                .then(function (response) {
                    $scope.dataset = response.data;
                    $scope.totalItems = $scope.dataset.length;
                });
        };
        $scope.findAllByAsnStatus= function () {
            $http.get('http://localhost:8080/asn/findAllByAsnStatus/' + $scope.asnStatus)
                .then(function (response) {
                    $scope.dataset = response.data;
                    $scope.totalItems = $scope.dataset.length;
                });
        };
        angular.element('#date-range-picker').daterangepicker();
    }]);


