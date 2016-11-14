(function () {
  'use strict';

  angular
    .module('launchpadApp.layout')
    .component('header', {
      templateUrl: 'app/layout/header.component.html',
      controller: HeaderController,
      controllerAs: 'vm'
    });

  HeaderController.$inject = ['authorizationService', '$state'];

  function HeaderController(authorizationService, $state) {
    const vm = this;
    vm.logout = logout;
    vm.authToken = authorizationService.getToken();

    function logout() {
      authorizationService.setToken(null);
      $state.go("login");
    }
  }
}());
