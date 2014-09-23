angular.module('home.services', [])
.factory('pouchdb', function() {
	var mydb = new PouchDB('http://localhost:5984/home');
	return mydb;
})
.factory('pHome', function($q, pouchdb, $rootScope) {
	return {
		fetchData: function(Id) {
			var deferred = $q.defer();
			pouchdb.get(Id, function(err, res) {
				$rootScope.$apply(function() {
					if (err) {
						deferred.reject(err);
					} else {
						deferred.resolve(res);
					}
				});
			});
			return deferred.promise;
		},
		pushData: function(doc) {
			var deferred = $q.defer();
			var newRev = parseInt(doc._rev.split('-')[0])+1;
			var tail = doc._rev.split('-')[1];
			newRev = newRev+'-'+tail;
			pouchdb.put(doc, doc._id, newRev, function(err, res) {
				$rootScope.$apply(function() {
					if (err) {
						deferred.reject(err);
					} else {
						deferred.resolve(res);
					}
				});
			});
			return deferred.promise;
		}
	}
})
