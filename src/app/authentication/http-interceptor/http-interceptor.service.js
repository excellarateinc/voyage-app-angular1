(function () {
  'use strict';

  angular
    .module('launchpadApp.authentication')
    .factory('httpInterceptor', httpInterceptor);

  httpInterceptor.$inject = ['$location', '$q'];

  function httpInterceptor($location, $q) {

    return {
      responseError
    };

    function responseError(response) {
      if(response.status === 401) {
        $location.url('/authentication/login');
      }
      return $q.reject(response);
    }
  }
}());
