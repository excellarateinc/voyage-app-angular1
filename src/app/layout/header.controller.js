(function () {
  'use strict';

  angular
    .module('launchpadApp.layout')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['authorizationService', '$state'];

  function HeaderController(authorizationService, $state) {
    const vm = this;
    vm.logout = logout;
    vm.authToken = authorizationService.getToken();
    vm.isCollapsed = true;

    function logout() {
      authorizationService.setToken(null);
      $state.go('login');
    }
  }
}());
