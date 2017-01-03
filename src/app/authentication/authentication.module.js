(function () {
  'use strict';

  angular
    .module('launchpadApp.authentication', [])
      .config(function config($httpProvider) {
        // Configure http interceptors
        $httpProvider.interceptors.push('authenticationInterceptor');
      })
}());
