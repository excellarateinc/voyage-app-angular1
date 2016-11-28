(function () {
  'use strict';

  angular
    .module('launchpadApp')
    .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appConfig($stateProvider, $urlRouterProvider) {

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

