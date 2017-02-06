(function () {
  'use strict';

  angular.module('voyage.mainNavigation')
    .factory('sidebarService', sidebarService);

  sidebarService.$inject = ['$document'];

  function sidebarService($document) {
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

      // Stop body from scrolling when menu open
      const bodyOverflow = sidenavScope.userOpened ? 'hidden' : 'auto';
      $document.find('body').css('overflow', bodyOverflow);
    }
  }
}());
