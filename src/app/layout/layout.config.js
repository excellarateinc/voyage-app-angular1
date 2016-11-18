(function () {
  'use strict';

  angular
    .module('launchpadApp.layout')
    .config(layoutConfig);

  layoutConfig.$inject = ['$stateProvider'];

  function layoutConfig($stateProvider) {

    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'app/layout/shell.html',
        controller: 'ShellController',
        controllerAs: 'vm'
      })
      .state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm'
      });
  }

}());
