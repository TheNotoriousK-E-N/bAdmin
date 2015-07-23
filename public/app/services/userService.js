// ======================
// Administration - Users
// ======================

angular.module('userService', [])
	.factory('User', function($http){
		var userFactory = {};

		// CRUD Operations

		// get one user
		userFactory.get(function(id){
			return $http.get('/admin/users/' + id);
		};

		// get all users
		userFactory.all = function(){
			return $http.get('/admin/users/')
		};

		// create a user
		userFactory.create = function(userData){
			return $http.post('/admin/users', userData)
		};

		// update a user
		userFactory.update = function(id, userData) {
			return $http.put('/admin/users/' + id, userData);
		};

		// delete a user
		userFactory.delete = function(id) {
			return $http.delete('/admin/users'+ id);
		}

		// return the userFactory
		return userFactory;
	});