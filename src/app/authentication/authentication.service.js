(function () {
  'use strict';

  angular
    .module('launchpadApp.authentication')
    .factory('authenticationService', authenticationService);

  authenticationService.$inject = ['$http', '$location', '$q', '$state', '$log', 'tokenService', 'API_URL', 'SERVER_URL'];

  function authenticationService($http, $location, $q, $state, $log, tokenService, API_URL, SERVER_URL) {

    return {
      initialize,
      loginWithVoyage,
      register,
      logout
    };

    function initialize() {
      redirectToLoginIfNoToken();
      handleEntryFromOauthRedirect();
      placeTokenOnHttpHeader();
    }

    // JavaScript initialized oauth login, currently not working but here for testing / future use
    function loginWithVoyage() {
      const content = 'client_id=client-super&redirect_uri=http://localhost:3000/#/oauth';

      $http.post(`${SERVER_URL}/oauth/authorize`, content, {
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin' : '*' }
      })
        .then(response => {
          $log(response);
        })
        .catch(error => {
          $log(error);
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

    function redirectToLoginIfNoToken() {
      if (!$location.search().access_token && !tokenService.getToken()) {
        $state.go('login');
      }
    }

    function handleEntryFromOauthRedirect() {
      const accessToken = $location.search().access_token;

      if (accessToken) {
        const expiresIn = parseInt($location.search().expires_in);
        const expirationDate = convertExpiresInSecondsToExpirationDate(expiresIn);
        tokenService.setToken(accessToken, expirationDate);
      }
    }

    function placeTokenOnHttpHeader() {
      const token = tokenService.getToken();
      $http.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    function convertExpiresInSecondsToExpirationDate(expiresIn) {
      const expirationDate = new Date();
      expirationDate.setSeconds(expirationDate.getSeconds() + expiresIn);
      return expirationDate;
    }
  }
}());
