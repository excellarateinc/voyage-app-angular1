(function () {
  'use strict';

  angular
      .module('launchpadApp.authentication')
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

    function setToken(tokenData) {
      $cookies.put(TOKEN_ID, tokenData.access_token, { expires: tokenData[".expires"] });
    }

    function deleteToken() {
      $cookies.remove(TOKEN_ID);
    }
  }
}());
