(function () {
  'use strict';

  angular
    .module('launchpadApp.layout')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['authorizationService', '$state', '$rootScope'];

  function HeaderController(authorizationService, $state, $rootScope) {
    const vm = this;
    vm.logout = logout;
    vm.toggleAvatar = toggleAvatar;
    vm.toggleSidebar = toggleSidebar;

    vm.authToken = authorizationService.getToken();

    function toggleAvatar() {
      $rootScope.$broadcast('toggleAvatar');
    }

    function toggleSidebar() {
      $rootScope.$broadcast('toggleSidebar');
    }

    function logout() {
      authorizationService.setToken(null);
      $state.go('login');
    }
  }
}());
