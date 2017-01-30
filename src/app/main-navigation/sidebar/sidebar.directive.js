(function () {
  'use strict';

  angular.module('voyage.mainNavigation')
    .directive("sidebar", sidebar);

  sidebar.$inject = ['$window', 'sidebarService'];

  function sidebar($window, sidebarService) {
    return {
      restrict: 'E',
      templateUrl: 'app/main-navigation/sidebar/sidebar.directive.html',
      scope: {
      },
      link(scope) {
        sidebarService.registerSidenavScope(scope);
        scope.lockedOpen = $window.innerWidth >= 992;
        scope.toggleSidenav = sidebarService.toggleSidenav;

        angular.element($window).bind('resize', () => {
          scope.lockedOpen = $window.innerWidth >= 992;
          if (scope.lockedOpen) {
            scope.userOpened = false;
          }
          scope.$apply();
        });
      }
    };
  }
}());
