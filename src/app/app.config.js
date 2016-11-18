(function () {
  'use strict';

  angular
    .module('launchpadApp.app')
    .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

  function appConfig($stateProvider, $urlRouterProvider, $httpProvider) {

    // Configure http interceptors
    $httpProvider.interceptors.push('authorizationInterceptor');

    // Configure default route
    $urlRouterProvider.otherwise('/');
  }

}());

