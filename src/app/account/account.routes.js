(function () {
  'use strict';

  angular
    .module('launchpadApp.account')
    .config(Config);

  Config.$inject = ['$stateProvider'];

  function Config($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/account.html',
        controller: 'AccountController',
        controllerAs: 'vm'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/account/account.html',
        controller: 'AccountController',
        controllerAs: 'vm'
      });
  }

}());

