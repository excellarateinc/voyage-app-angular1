(function () {
  'use strict';

  angular
      .module('launchpadApp.authentication')
      .factory('tokenService', tokenService);

  tokenService.$inject = ['$cookies'];

  function tokenService($cookies) {

    return  {
      getToken,
      setToken
    };

    function getToken() {

    }

    function setToken(tokenData) {

    }
  }
}());
