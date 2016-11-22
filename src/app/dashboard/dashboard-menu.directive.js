(function () {
  'use strict';

  angular.module('launchpadApp.core')
    .directive("dashboardMenu", dashboardMenu);

  //////////////

  function dashboardMenu() {
    return {
      restrict: 'E',
      templateUrl: 'dashboard/dashboard-menu.directive.html',
      scope: {
        title: '@'
      },
      link: function (scope) {
      }
    };
  }
})();
