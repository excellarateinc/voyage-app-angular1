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
        templateUrl: 'app/account/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/account/register.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
      });
  }

}());

