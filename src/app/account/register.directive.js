(function () {
  'use strict';

  angular.module('launchpadApp.account')
    .directive("register", Register);

  Register.$inject = ['accountService', '$state', 'errorService'];

  //////////////

  function Register(accountService, $state, errorService) {
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
                vm.registrationErrors = [];
                $state.go('app.login');
              })
              .catch(failure => {
                  const errors = errorService.getModelStateErrors(failure);
                  vm.registrationErrors = errors;
                }
              );
          } else {
            vm.registrationErrors = ['Passwords must match'];
          }
        }
      }
    };
  }
})();
