(function () {
  'use strict';

  angular.module('voyage.mainNavigation')
    .directive("navbar", navbar);

  navbar.$inject = ['sidebarService'];

  function navbar(sidebarService) {
    return {
      restrict: 'E',
      templateUrl: 'app/main-navigation/navbar/navbar.directive.html',
      scope: {
      },
      link(scope) {
        scope.toggleSidenav = sidebarService.toggleSidenav;
      }
    };
  }
}());
