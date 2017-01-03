(function () {
  'use strict';

  angular
    .module('launchpadApp.authentication')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$state', 'authenticationService', 'errorService'];

  function RegisterController($state, authenticationService, errorService) {
    const vm = this;
    vm.register = register;

    function register() {
      if(vm.password === vm.confirmPassword) {
        authenticationService.register(vm.email, vm.firstName, vm.lastName, vm.password, vm.confirmPassword)
          .then(() => {
            vm.registrationErrors = [];
            $state.go('login');
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
