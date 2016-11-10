(function() {
	'use strict';

	angular
	  .module('launchpadApp', ['ui.router', 'launchpadApp.dashboard', 'launchpadApp.layout', 'launchpadApp.core', 'launchpadApp.account'])
	  .config(appConfig);

	appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

	function appConfig($stateProvider, $urlRouterProvider, $httpProvider) {
	    //Configure http interceptors
	    $httpProvider.interceptors.push('authorizationInterceptor');

	    //Configure default route
	    $urlRouterProvider.otherwise('/login');
	}
})();

