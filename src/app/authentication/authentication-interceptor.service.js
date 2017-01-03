(function () {
  'use strict';

  angular
    .module('launchpadApp.authentication')
    .factory('authenticationInterceptor', authenticationInterceptor);

  authenticationInterceptor.$inject = ['$location', 'tokenService', '$q'];

  function authenticationInterceptor($location, tokenService, $q) {

    return {
      request,
      responseError
    };

    function request(config) {
      const token = tokenService.getToken();
      if(token) {
        config.headers.Authorization = `bearer ${token}`;
      }
      return config;
    }

    function responseError(response) {
      if(response.status === 401) {
        $location.url('/account/login');
      }
      return $q.reject(response);
    }
  }
}());
