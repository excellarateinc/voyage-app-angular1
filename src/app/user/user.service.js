(function () {
  'use strict';

  angular
    .module('launchpadApp.user')
    .factory('userService', userService);

  userService.$inject = ['$http', 'API_URL'];

  function userService($http, API_URL) {

    return  {
      list,
      save
    };

    function list() {
      return $http.get(`${API_URL}/v1/users`)
        .then(response => response.data);
    }

    function save(email, password, firstName, lastName) {
      const user = {
        email,
        password,
        firstName,
        lastName,
        confirmPassword: password
      };

      return $http.post(`${API_URL}/v1/account/register`, user)
        .then(response => response.data)
        .catch(failure => $q.reject(failure.data));
    }

  }
}());
