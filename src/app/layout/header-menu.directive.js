(function () {
  'use strict';

  angular.module('launchpadApp.layout')
    .directive("headerMenu", headerMenu);

  headerMenu.$inject = ['authorizationService', '$state', '$rootScope', 'toaster'];

  //////////////

  function headerMenu(authorizationService, $state, $rootScope, toaster) {
    return {
      restrict: 'E',
      templateUrl: 'app/layout/header-menu.directive.html',
      scope: {
        title: '@'
      },
      link: function (scope) {
        scope.logout = logout;

        function logout() {
          authorizationService.setToken(null);
          scope.authToken = null;
          $state.go("login");
          showMessage();
        }

        $rootScope.$on('login:success', function (params) {
          scope.authToken = authorizationService.getToken();
        });

        function showMessage() {
          toaster.pop('success', 'Logout', 'You have logged out successfully');
        }
      }
    };
  }
})();
