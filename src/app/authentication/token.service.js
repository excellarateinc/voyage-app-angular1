(function () {
  'use strict';

  angular
      .module('voyage.authentication')
      .factory('tokenService', tokenService);

  tokenService.$inject = ['$cookies'];

  function tokenService($cookies) {
    const TOKEN_ID = 'token';

    return  {
      getToken,
      setToken,
      deleteToken
    };

    function getToken() {
      return $cookies.get(TOKEN_ID);
    }

    function setToken(accessToken, expirationDate) {
      $cookies.put(TOKEN_ID, accessToken, { expires: expirationDate });
    }

    function deleteToken() {
      $cookies.remove(TOKEN_ID);
    }
  }
}());
