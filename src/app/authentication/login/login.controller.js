(function () {
  'use strict';

  angular
    .module('launchpadApp.authentication')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['accountService', '$state'];

  function LoginController(accountService, $state) {
    const vm = this;
    vm.login = login;

    function login() {
      accountService.login(vm.username, vm.password)
        .then(() => {
          $state.go('main.dashboard');
        });
    }
  }
}());


