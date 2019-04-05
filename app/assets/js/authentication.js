'use strict';

angular.module('AuthenticationController', ['LocalStorageModule'])

	.factory('authenticationFactory', ['localStorageService', '$location', function (localStorageService, $location) {
		function authenticateLogin(){
			if(localStorageService.get('name') !== null &&
				localStorageService.get('userId') !== null){
			}else {
				alert("DENY");
				$location.path('/login');
			}
		}

		function logout() {
			localStorageService.remove('name');
			localStorageService.remove('roleId');
			localStorageService.remove('warehouse');

			$location.path('/login');

		}
		function login() {
			console.log(localStorageService.get('name'));
		}

		return {
			authenticateLogin: authenticateLogin,
			logout: logout,
			login: login
		};

	}]);