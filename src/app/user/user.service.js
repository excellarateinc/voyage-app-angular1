(function () {
  'use strict';

  angular
    .module('launchpadApp.user')
    .factory('userService', userService);

  userService.$inject = ['$http', 'API_URL'];

  function userService($http, API_URL) {

    return  {
      list
    };

    function list() {
      return $http.get(`${API_URL}/v2/users`)
        .then(response => response.data);
    }

  }
}());
