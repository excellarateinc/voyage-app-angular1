(function () {
  'use strict';

  angular.module('launchpadApp.mainNavigation')
    .directive("lsLogo", lsLogo);

  function lsLogo() {
    return {
      restrict: 'E',
      templateUrl: 'app/logo/ls-logo.directive.svg',
      scope: {
      },
      link() {

      }
    };
  }
}());
