(function () {
  'use strict';

  angular.module('voyage.mainNavigation')
    .directive("lsLogo", lsLogo);

  function lsLogo() {
    return {
      restrict: 'E',
      templateUrl: 'app/logo/voyage-logo-horiz.svg',
      scope: {
      },
      link() {

      }
    };
  }
}());
