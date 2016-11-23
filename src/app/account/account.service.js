(function () {
  'use strict';

  angular
    .module('launchpadApp.account')
    .factory('accountService', accountService);

  accountService.$inject = ['$http', 'authorizationService', '$q', 'API_URL'];

  function accountService($http, authorizationService, $q, API_URL) {

    return  {
      login,
      register
    };

    function login(username, password) {
      const content = `grant_type=password&username=${username}&password=${password}`;

      return $http.post(`${API_URL}/v2/login`, content, {
        headers: { 'Content-Type' :  'application/x-www-form-urlencoded'  }
      })
        .then(response => {
          authorizationService.setToken(response.data.access_token);
        });
    }

    function register(email, password, firstName, lastName) {
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
