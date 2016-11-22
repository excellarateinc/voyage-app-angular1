(function () {
  'use strict';

  angular.module('launchpadApp.layout')
    .directive("headerMenu", headerMenu);

  //////////////

  function headerMenu() {
    return {
      restrict: 'E',
      templateUrl: 'app/layout/header-menu.directive.html',
      scope: {
        title: '@'
      },
      link: function (scope) {
      }
    };
  }
})();
