'use strict'

angular.module('controller.receiving.LoadingDockController', ['AuthenticationController'])

	.controller('loadingDockCtrl', ['$scope', 'authenticationFactory', function ($scope, authenticationFactory) {
		authenticationFactory.authenticateLogin();

		$scope.loadingDockNames = ["Dock Medan", "Dock Jakarta"];
		$scope.refreshLoadingDockData = function () {
			console.log("test");
		}


	}])