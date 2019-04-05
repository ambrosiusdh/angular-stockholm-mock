'use strict';

angular.module('WarehouseController', ['LocalStorageModule', 'AuthenticationController'])

	.controller('warehouseCtrl',
		[	'$scope',
			'$location',
			'localStorageService',
			'authenticationFactory',
			function ($scope, $location, localStorageService, authenticationFactory) {
				authenticationFactory.authenticateLogin();
				$scope.userName = localStorageService.get('name');

				$scope.logout = function () {
					authenticationFactory.logout();
				}
			}]);