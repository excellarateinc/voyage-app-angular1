(function () {
  'use strict';

  angular
    .module('voyage.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$http', '$log', 'API_URL'];

  function DashboardController($http, $log, API_URL) {

    // Hit the users API and log results to console for authentication testing only
    // TODO: Remove once authentication is tested and complete
    $http.get(`${API_URL}/users`)
      .then($log.log);


  }

}());




