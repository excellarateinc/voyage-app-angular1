(function () {
  'use strict';

  angular
    .module('launchpadApp.app')
    .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

  function appConfig($stateProvider, $urlRouterProvider, $httpProvider) {

    // Configure http interceptors
    $httpProvider.interceptors.push('authorizationInterceptor');

    // Configure default route
    $urlRouterProvider.otherwise('/login');

    $stateProvider

      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm'
      });
  }

}());

