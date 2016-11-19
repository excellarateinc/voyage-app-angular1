(function () {
  'use strict';

  angular
    .module('launchpadApp.account')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['accountService', '$state', 'errorService'];

  function RegisterController(accountService, $state, errorService) {
    const vm = this;
    vm.register = register;

    function register() {
      if(vm.password === vm.confirmPassword) {
        accountService.register(vm.username, vm.password, vm.firstName, vm.lastName)
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

}());
