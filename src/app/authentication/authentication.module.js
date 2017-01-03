(function () {
  'use strict';

  angular
    .module('launchpadApp.authentication', [
      'launchpadApp.core'
    ])
      .config(config);

  config.$inject = ['$httpProvider'];

  function config($httpProvider) {
    // Configure http interceptors
    $httpProvider.interceptors.push('authenticationInterceptor');
  }

}());
