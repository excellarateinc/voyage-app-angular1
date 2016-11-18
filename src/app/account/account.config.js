(function () {
  'use strict';

  angular
    .module('launchpadApp.account')
    .config(accountConfig);

  accountConfig.$inject = ['$stateProvider'];

  function accountConfig($stateProvider) {

    $stateProvider
      .state('app.login', {
        url: '/login',
        templateUrl: 'app/account/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      });
  }

}());
