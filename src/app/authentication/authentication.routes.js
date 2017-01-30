(function () {
  'use strict';

  angular
    .module('voyage.authentication')
    .run(appRun);

  function appRun(routerHelper, authenticationService) {
    routerHelper.configureStates(getStates());
    authenticationService.initialize();
  }

  function getStates() {
    return [
      {
        state: 'login',
        config: {
          url: '/authentication/login',
          templateUrl: 'app/authentication/login/login.html',
          controller: 'LoginController',
          controllerAs: 'vm'
        }
      },

      {
        state: 'register',
        config: {
          url: '/authentication/register',
          templateUrl: 'app/authentication/register/register.html',
          controller: 'RegisterController',
          controllerAs: 'vm'
        }
      }
    ];
  }
}());
