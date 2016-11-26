(function () {
  'use strict';

  angular
    .module('launchpadApp.layout')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$rootScope'];

  function SidebarController($rootScope) {
    const vm = this;

    activate();

    function activate() {
      vm.avatarVisible = false;
      const avatarListener = $rootScope.$on('toggleAvatar', function(){
        vm.avatarVisible = !vm.avatarVisible;
      });

      const sidebarToggle = $rootScope.$on('toggleSidebar', function() {
        $rootScope.sidebarToggled = !$rootScope.sidebarToggled;
      });

      $rootScope.$on('$destroy', avatarListener);
      $rootScope.$on('$destroy', sidebarToggle);
    }
  }
}());
