'use strict';

angular.module('loginController', [])

	.controller('loginCtrl', ['$scope', '$location', function ($scope, $location) {

		$scope.test = $location.path();
		$scope.testLocation = function () {
			return
		}
	}]);