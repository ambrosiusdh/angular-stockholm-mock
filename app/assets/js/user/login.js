'use strict';

angular.module('LoginController', ['ngCookies', 'LocalStorageModule'])

	.controller('loginCtrl',
		   ['$scope',
			'$location',
			'$http',
			'$cookies',
			'localStorageService',
				function ($scope, $location, $http, $cookies, localStorageService) {
			$scope.formData = {};
			$scope.test = $location.path();
			$scope.loginAlert = false;

			$scope.initInput = function(){
				try {
					if($cookies.get('userEmail') !== undefined &&
						$cookies.get('password') !== undefined ){
						$scope.userEmail = $cookies.get('userEmail');
						$scope.userPassword = $cookies.get('password');
						$scope.rememberMe = true;
					}

				}catch (e) {
					console.log(e)
				}

			};

			$scope.initInput();



			$scope.validateLogin = function () {
				if($scope.userEmail === undefined && $scope.userPassword === undefined)
					return $scope.loginAlert = true;

				$scope.formData = {
					email: $scope.userEmail,
					password: $scope.userPassword
				};

				$http.post('http://localhost:8080/user/login', $scope.formData)
					.then(function (response) {
						console.log(response);
						if(!jQuery.isEmptyObject(response.data)) {
							if($scope.rememberMe) {
								$scope.loginAlert = false;
								var expireDate = new Date();
								expireDate.setMinutes(expireDate.getMinutes() + 120)

								$cookies.put(
									'userEmail',
									response.data.userEmail,
									{'expires': expireDate}
								);

								$cookies.put(
									'password',
									response.data.userPassword,
									{'expires': expireDate});

								console.log($cookies.get('username'));
								console.log($cookies.get('password'));
							}else{
								$cookies.remove('username');
								$cookies.remove('password');
							}

							localStorageService.set('name', response.data.userName);
							localStorageService.set(
								'userId', response.data.userId
							);
							//localStorageService.set('warehouse', "--Pilih Warehouse--");
							$location.path("/warehouse");
						}else
							$scope.loginAlert = true;
					});
			};
	}]);