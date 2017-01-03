(function () {
  'use strict';

  angular
    .module('launchpadApp.authentication')
    .factory('authenticationService', authenticationService);

  authenticationService.$inject = ['$http', '$q', '$state', 'tokenService', 'API_URL'];

  function authenticationService($http, $q, $state, tokenService, API_URL) {

    return {
      login,
      register,
      logout
    };

    function login(username, password) {
      const content = `grant_type=password&username=${username}&password=${password}`;

      return $http.post(`${API_URL}/login`, content, {
        headers: { 'Content-Type' :  'application/x-www-form-urlencoded'  }
      })
        .then(response => {
          tokenService.setToken(response.data);
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

    function logout() {
      tokenService.deleteToken();
      $state.go('login');
    }
  }
}());
