'use strict';

angular.module('testApp', ['ngRoute'])
    .controller('indexCtrl', ['$scope', function ($scope) {
        $scope.test = 'test'
    }])