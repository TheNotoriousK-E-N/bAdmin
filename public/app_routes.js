angular.module('app.routes', ['ngRoute'])
	.config(function($routeProvider, $locationProvider){
		$locationProvider.html5Mode(true);

		$routeProvider
			.when('/', {
				templateURL: 'app/views/pages/home.html'
			});
	});