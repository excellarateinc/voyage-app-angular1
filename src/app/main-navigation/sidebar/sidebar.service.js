(function () {
  'use strict';

  angular.module('launchpadApp.mainNavigation')
    .factory('sidebarService', sidebarService);

  function sidebarService() {
    let sidenavScope;

    return {
      registerSidenavScope,
      toggleSidenav
    };

    function registerSidenavScope(scope) {
      sidenavScope = scope;
    }

    function toggleSidenav() {
      sidenavScope.userOpened = !sidenavScope.userOpened;
    }
  }
}());
