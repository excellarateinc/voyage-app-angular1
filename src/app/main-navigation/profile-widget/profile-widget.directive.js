(function () {
  'use strict';

  angular.module('voyage.mainNavigation')
    .directive("profileWidget", profileWidget);

  profileWidget.$inject = ['authenticationService'];

  function profileWidget(authenticationService) {
    return {
      restrict: 'E',
      templateUrl: 'app/main-navigation/profile-widget/profile-widget.directive.html',
      scope: {
      },
      link(scope, element, attributes) {
        scope.menuOpen = false;
        scope.showCompact = angular.isDefined(attributes.$attr.compactMode);

        scope.toggleMenu = () => scope.menuOpen = !scope.menuOpen;
        scope.logout = authenticationService.logout;
      }
    };
  }
}());
