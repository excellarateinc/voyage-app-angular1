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
    $urlRouterProvider.otherwise('/account/login');

    $stateProvider

      .state('main', {
        abstract: true,
        templateUrl: 'app/main-navigation/main-navigation.html',
        controller: 'MainNavigationController',
        controllerAs: 'vm'
      })

      .state('main.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm'
      })

      .state('login', {
        url: '/account/login',
        templateUrl: 'app/account/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })

      .state('register', {
        url: '/account/register',
        templateUrl: 'app/account/register.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
      });
  }

}());

