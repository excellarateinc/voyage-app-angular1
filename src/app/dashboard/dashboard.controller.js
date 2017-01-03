(function () {
  'use strict';

  angular
    .module('launchpadApp.dashboard')
    .controller('DashboardController', DashboardController);

  function DashboardController($http, API_URL) {
    $http.get(`${API_URL}/users`); // Temporary test for authentication
  }

}());




