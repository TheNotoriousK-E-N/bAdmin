// =======================
// Main Controller
// =======================

angular.module('mainController',[])
	.controller('mainController', function($rootScope, $location, Auth){
		var vm = this;

		// check login status
		vm.loggedIn = Auth.isLoggedIn();

		// check login status on every request
		$rootScope.$on('$routeChangeStart', function(){
			vm.loggedIn = Auth.isLoggedIn();
		
		

			//get user info on route change
			Auth.getUser()
				.success(function(data){
					vm.user = data;
				});
		});

		vm.doLogin = function() {
			// call the Auth.login() function
			Auth.login(vm.loginData.userName, vm.loginData.password)
				.success(function(data){
					// if user successfully logs in, send to dashboard
					$location.path('/dashboard');
				});
		};

		vm.doLogout = function() {
			Auth.logout();
			// reset user data
			vm.user = {};
			location.path('/login');
		};
	});