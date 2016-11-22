(function () {
  'use strict';

  angular
    .module('launchpadApp.user')
    .config(Config);

  Config.$inject = ['$stateProvider'];

  function Config($stateProvider) {
    $stateProvider

      .state('user', {
        url: '/user',
        templateUrl: 'app/user/user.list.html',
      });
  }

}());

