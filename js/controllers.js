angular.module('home.controllers', [])
.controller('MainCtrl', function($scope, $q, $modal, pHome) {
	$scope.addNew = false;
	$scope.reverse = false;
	$scope.openDatepicker = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.dpopened = true;
	}
	$scope.pushData = function() {
		$scope.newRec.day = $scope.dt.getDate();
		$scope.newRec.month = $scope.dt.getMonth()+1;
		$scope.newRec.year = $scope.dt.getFullYear();
		$scope.all.vals.push($scope.newRec);
		$scope.addNew = false;
		pHome.pushData($scope.all).then(function(res) {
			$scope.refreshData();
		}, function(err) {
			console.log(err);
		})
	}
	$scope.refreshData = function() {
		pHome.fetchData('all').then(function(res) {
			$scope.newRec = {
				day: null,
				month: null,
				year: null,
				hb: null,
				hk: null,
				cb: null,
				ck: null,
				el: null,
				gs: null
			}
			$scope.all = res;
			$scope.dt = new Date(res.vals[res.vals.length-1].year+'-'+res.vals[res.vals.length-1].month+'-'+res.vals[res.vals.length-1].day);
		}, function(err) {
			console.log(err);
		})		
	}
	$scope.refreshData();
})
