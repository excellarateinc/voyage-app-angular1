(function () {
  'use strict';

  angular
      .module('launchpadApp.authentication')
      .config(config);

  config.$inject = ['$httpProvider'];

  function config($httpProvider) {
    // Configure http interceptors
    $httpProvider.interceptors.push('httpInterceptor');
  }

}());
