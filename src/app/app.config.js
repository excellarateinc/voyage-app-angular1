(function () {
  'use strict';

  angular
    .module('voyage.app')
    .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider

      .state('main', {
        abstract: true,
        templateUrl: '/app/main-navigation/main-navigation.html',
        controller: 'MainNavigationController',
        controllerAs: 'vm'
      })

      .state('main.dashboard', {
        url: '/dashboard',
        templateUrl: '/app/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm'
      });
  }

}());

