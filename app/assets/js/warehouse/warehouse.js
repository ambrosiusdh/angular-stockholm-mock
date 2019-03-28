'use strict';

angular.module('warehouseController', [])

	.controller('warehouseCtrl', ['$scope', function ($scope) {
		$scope.warehouseList = ["Gudang Jakarta", "Gudang Medan"];
	}]);