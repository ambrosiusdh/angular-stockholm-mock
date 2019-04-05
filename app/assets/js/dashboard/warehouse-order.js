'use strict';

angular.module('controller.dashboard.WarehouseOrderController', ['AuthenticationController'])

    .controller('warehouseOrderCtrl', ['$scope', '$http', 'authenticationFactory', function ($scope, $http, authenticationFactory) {
        authenticationFactory.authenticateLogin();

        $http.get('http://localhost:8080/warehouse')
            .then(function (response) {
                $scope.dataset = response.data;
            });
        $scope.date = new Date();
    }]);