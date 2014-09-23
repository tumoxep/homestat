angular.module('home', ['ui.router', 'ui.bootstrap', 'home.controllers', 'home.services'])
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('main', {
		url: '/main',
		templateUrl: 'templates/main.html',
		controller: 'MainCtrl'
	})
	$urlRouterProvider.otherwise('/main');
})
