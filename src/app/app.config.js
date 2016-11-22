(function () {
  'use strict';

  angular
    .module('launchpadApp')
    .config(appConfig);

  appConfig.$inject = ['$httpProvider'];

  function appConfig($httpProvider) {

    // Configure http interceptors
    $httpProvider.interceptors.push('authorizationInterceptor');
  }

}());

