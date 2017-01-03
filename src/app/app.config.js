(function () {
  'use strict';

  angular
    .module('launchpadApp.app')
    .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider

      .state('main', {
        abstract: true,
        templateUrl: 'app/main-navigation/main-navigation.html',
        controller: 'MainNavigationController',
        controllerAs: 'vm'
      })

      .state('main.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm'
      });
  }

}());

