(function () {
  'use strict';

  angular.module('launchpadApp.mainNavigation')
    .directive("lsLogo", lsLogo);

  function lsLogo() {
    return {
      restrict: 'E',
      templateUrl: 'app/logo/logo.directive.svg',
      scope: {
      },
      link() {

      }
    };
  }
}());
