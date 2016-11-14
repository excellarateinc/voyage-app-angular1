(function () {
  'use strict';

  angular
    .module('launchpadApp.account')
    .component('register', {
      templateUrl: 'app/account/register.component.html',
      controller: RegisterController,
      controllerAs: 'vm'
    });

  RegisterController.$inject = ['accountService', '$state', 'errorService'];

  function RegisterController(accountService, $state, errorService) {
    const vm = this;
    vm.register = register;

    function register() {
      if(vm.password === vm.confirmPassword) {
        accountService.register(vm.username, vm.password)
          .then(() => {
            vm.registrationErrors = [];
            $state.go('login');
          })
          .catch(failure => {
            const errors = errorService.getModelStateErrors(failure);
            vm.registrationErrors = errors;
          }
        );
      } else{
        vm.registrationErrors = ['Passwords must match'];
      }
    }
  }

}());
