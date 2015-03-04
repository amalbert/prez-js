	(function() {
		var User = require('./user');
		var mongodb = require('mongodb');
		var q = require("q");

		function resolveResult(deferred) {
			return function(error, result) {
				if (error) deferred.reject(error);
				else deferred.resolve(result);
			}
		}
		var api = {};
		api.save = function(user) {
			var deferred = q.defer();
			user.save(resolveResult(deferred));
			return deferred.promise;
		}
		
		api.list = function() {
			var deferred = q.defer();
			User.find(resolveResult(deferred));
			return deferred.promise;
		}

	    module.exports = api;

	}());


