(function () {
  'use strict';

  angular
    .module('launchpadApp')
    .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

  function appConfig($stateProvider, $urlRouterProvider, $httpProvider) {

    // Configure http interceptors
    $httpProvider.interceptors.push('authorizationInterceptor');

    // Configure default route
    $urlRouterProvider.otherwise('/login');

    // TODO: Move state configuration to individual modules.
    // Configure ui states
    const states = [
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
    states.forEach(state => $stateProvider.state(state));
  }

}());

