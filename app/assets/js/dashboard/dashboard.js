'use strict'

angular.module('DashboardController', ['AuthenticationController'])

    .controller('dashboardCtrl', ['$scope', 'authenticationFactory', function ($scope, authenticationFactory) {
        authenticationFactory.authenticateLogin();
        $scope.inboundPending = 49789;
        $scope.inboundDone = 4085;
        $scope.outboundPending = 5028;
        $scope.outboundDone = 480;
        $scope.date = new Date();
        $scope.checkAmount = function(){
            return $scope.inboundPending > 0 ? 'inbound__amount-warning' : ''
        }
    }]);

