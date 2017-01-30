(function () {
  'use strict';

  angular
      .module('voyage.authentication')
      .config(config);

  config.$inject = ['$httpProvider'];

  function config($httpProvider) {
    // Configure http interceptors
    $httpProvider.interceptors.push('httpInterceptor');
  }

}());
