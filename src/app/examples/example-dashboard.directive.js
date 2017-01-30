(function () {
  'use strict';

  angular.module('voyage.examples')
      .directive("exampleDashboard", exampleDashboard);

  function exampleDashboard() {
    return {
      restrict: 'E',
      templateUrl: 'app/examples/example-dashboard.directive.html',
      scope: {
      },
      link() {

      }
    };
  }
}());
