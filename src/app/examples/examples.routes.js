(function () {
  'use strict';

  angular
    .module('voyage.examples')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'main.deposit',
        config: {
          url: '/examples/deposit',
          templateUrl: 'app/examples/deposit/deposit.html',
          controller: 'DepositController',
          controllerAs: 'vm'
        }
      },
      {
        state: 'main.profile',
        config: {
          url: '/examples/profile',
          templateUrl: 'app/examples/profile/profile.html',
          controller: 'ProfileController',
          controllerAs: 'vm'
        }
      }
    ];
  }
}());
