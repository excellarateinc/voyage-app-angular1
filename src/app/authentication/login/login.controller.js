(function () {
  'use strict';

  angular
    .module('launchpadApp.authentication')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['authenticationService', '$state'];

  function LoginController(authenticationService, $state) {
    const vm = this;
    vm.login = login;

    function login() {
      authenticationService.login(vm.username, vm.password)
        .then(() => {
          $state.go('main.dashboard');
        });
    }
  }
}());


