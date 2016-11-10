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

	        //Configure ui states
	    var states = [
	    { 
	        name: 'login', 
	        url: '/login',
	        views: {
	            content: {
	                // Using component: instead of template:
	                component: 'login'
	            },
	            header: {
	                component: 'header'
	            }
	        }         
	    },
	    { 
	        name: 'register', 
	        url: '/register',
	        views: {
	            content: {
	                // Using component: instead of template:
	                component: 'register'
	            },
	            header: {
	                component: 'header'
	            }
	        }         
	    },    
	    {
	        name: 'dashboard',
	        url: '/dashboard',
	        views: {
	            content: {                
	                component: 'dashboard'
	            },
	            header: {
	                component: 'header'
	            }
	        }
	    }];

	    // Loop over the state definitions and register them
	    states.forEach(function(state) {
	        $stateProvider.state(state);
	    });
	}
})();

