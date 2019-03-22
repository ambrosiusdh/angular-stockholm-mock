'use strict';

angular.module('myApp.view1', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html'
  });
}])

.controller('View1Ctrl', ['$scope',function($scope) {
    $scope.id = 1
    $scope.firstNumber = 0
    $scope.secondNumber= 0
    $scope.resetNumber = function () {
        $scope.firstNumber = 0
        $scope.secondNumber = 0
    }
    $scope.increaseFirstNumber = function () {
        $scope.firstNumber++
    }
    $scope.increaseSecondNumber = function () {
        $scope.secondNumber++
    }
}]);