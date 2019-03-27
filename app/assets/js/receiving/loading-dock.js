'use strict'

angular.module('controller.receiving.LoadingDockController', [])

	.controller('loadingDockCtrl', ['$scope', function ($scope) {
		$scope.loadingDockNames = ["Dock Medan", "Dock Jakarta"]
		$scope.refreshLoadingDockData = function () {
			console.log("test")
		}


	}])