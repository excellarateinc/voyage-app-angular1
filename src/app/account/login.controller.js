(function () {
  'use strict';

  angular
    .module('launchpadApp.account')
    .controller('LoginController', LoginController)

  LoginController.$inject = ['accountService', '$state', 'toaster', 'errorService', '$rootScope'];

  function LoginController(accountService, $state, toaster, errorService, $rootScope) {
    const vm = this;
    vm.login = login;

    function login() {
      accountService.login(vm.username, vm.password)
        .then(() => {
          vm.errors = [];
          $state.go('user');
          $rootScope.$broadcast('login:success');
        })
        .catch(failure => {
          if (failure) {
             const errors = errorService.getModelStateErrors(failure);
             console.log(failure)
             toaster.pop('error', 'Login failure', errors);
          }
      });
    }
  }
}());


