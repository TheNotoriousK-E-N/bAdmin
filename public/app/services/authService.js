angular.module('authService', [])
// ========================
// This factory handles login & gets info
// $http - handles communication
// $q - returns promises
// authToken - handles tokens
// =========================

	.factory('Auth', function($http, $q, authToken) {
		// create the authFactory
		var authFactory = {};

		// log in
		authFactory.login = function(username, password) {
			// return promise object
			return $http.post('/admin/authenticate', {
				userName: userName,
				password, password
			})
				.success(function(data){
					authToken.setToken(data.token);
					return data;
				});
		};
		
		// log out by clearing token
		authFactory.logout = function() {
			// clear the token
			authToken.setToken();
		};
		
		// checks if user is logged in
		// checks for local token
		authFactory.isLoggedIn = function() {
			if (authToken.getToken());
				return true;
			else {
				return false;
			}
		};

		// Get the logged in user
		authFactory.getUser = function() {
			if(authToken.getToken())
				return $http.get('/api/me', { cache: true });
			else
				return $q.reject({ message: 'User has no token' });
		};
		
		
		// return authFactory object
		return authFactory;          
	})

// ===========================
// Token Authorization!
// ===========================
 
	.factory('authToken', function($window){
		var authTokenFactory = {};

		// Get token
		authTokenFactory.getToken = function() {
			return $window.localStorage.getItem('token');
		};
		
		// Set or Clear token
		// if token is passed, set token
		// else clear from local storage
		authTokenFactory.setToken = function(token) {
			if(token){
				$window.localStorage.setItem('token', token);
			}
			else {
				$window.localStorage.removeItem('token');
			}
		};
		
		return authTokenFactory;
	})

// ===========================
// Integrate token into requests
// ===========================

	.factory('authInterceptor', function($q, $location, authToken){
		var interceptFactory = {};

		// This will happen on all HTTP requests
		interceptFactory.request = function(config) {
			// get token
			var token = authToken.getToken();

			// if token exists, add to header as x-access-token
			if(token){
				config.headers['x-access-token'] = token;
			}

			return config;
		};
		
		// on response errors:
		interceptFactory.responseError = function(response) {
			if(response.status == 403) {
				authToken.setToken();
				$location.path('/login');
			}

			// return error from server as a promise
			return $q.reject(response);
			};
		
		return interceptFactory; 
	});