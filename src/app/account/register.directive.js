(function () {
  'use strict';

  angular.module('launchpadApp.account')
    .directive("register", Register);

  Register.$inject = ['accountService', '$state', 'errorService', 'toaster'];

  //////////////

  function Register(accountService, $state, errorService, toaster) {
    return {
      restrict: 'E',
      templateUrl: 'app/account/register.directive.html',
      scope: {
        user: '=',
      },
      link: function (scope) {
        scope.register = register;

        function register() {
          if(scope.user.password === scope.user.confirmPassword) {
            accountService.register(scope.user.username, scope.user.password, scope.user.firstName, scope.user.lastName)
              .then(() => {
                toaster.pop('success', 'Logout', 'You have Registered successfully');
                $state.go('app.login');
              })
              .catch(failure => {
                  const errors = errorService.getModelStateErrors(failure);
                  toaster.pop('error', 'Registration failure', errors.join(","));
                }
              );
          } else {
            scope.registrationErrors = ['Passwords must match'];
            toaster.pop('error', 'Registration failure', 'Passwords must match');
          }
        }
      }
    };
  }
})();
