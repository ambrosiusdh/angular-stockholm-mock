'use strict'

angular.module('controller.dashboard.WarehouseOrderController', [])

    .controller('warehouseOrderCtrl', ['$scope', '$http', function ($scope, $http) {
        $http.get('http://localhost:8080/warehouse')
            .then(function (response) {
                $scope.dataset = response.data
            })
        $scope.date = new Date()
    }])