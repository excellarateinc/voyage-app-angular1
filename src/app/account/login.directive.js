(function () {
  'use strict';

  angular.module('launchpadApp.account')
    .directive("login", Login);

  Login.$inject = ['accountService', '$state', 'toaster', 'errorService', '$rootScope'];

  //////////////

  function Login(accountService, $state, toaster, errorService, $rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'app/account/login.directive.html',
      scope: {
        user: '=',
      },
      link: function (scope) {
        scope.login = login;

        function login() {
          accountService.login(scope.user.username, scope.user.password)
            .then(() => {
              scope.errors = [];
              $state.go('user');
              $rootScope.$broadcast('login:success');
            })
            .catch(failure => {
              if (failure) {
                const errors = errorService.getModelStateErrors(failure);
                toaster.pop('error', 'Login failure', errors);
              }
            });
        }
      }
    };
  }
})();
