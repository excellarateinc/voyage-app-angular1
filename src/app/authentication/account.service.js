(function () {
  'use strict';

  angular
    .module('launchpadApp.authentication')
    .factory('accountService', accountService);

  accountService.$inject = ['$http', '$q', 'authorizationService', 'API_URL'];

  function accountService($http, $q, authorizationService, API_URL) {

    return  {
      login,
      register
    };

    function login(username, password) {
      const content = `grant_type=password&username=${username}&password=${password}`;

      return $http.post(`${API_URL}/login`, content, {
        headers: { 'Content-Type' :  'application/x-www-form-urlencoded'  }
      })
        .then(response => {
          authorizationService.setToken(response.data);
        });
    }

    function register(email, firstName, lastName, password, confirmPassword) {
      const user = {
        email,
        firstName,
        lastName,
        password,
        confirmPassword
      };

      return $http.post(`${API_URL}/account/register`, user)
        .then(response => response.data)
        .catch(failure => $q.reject(failure.data));
    }
  }
}());
