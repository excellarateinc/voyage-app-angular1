(function () {
  'use strict';

  angular
    .module('launchpadApp.authentication')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['authenticationService', '$state'];

  function LoginController(authenticationService) {
    const vm = this;
    vm.loginWithVoyage = loginWithVoyage;


    function loginWithVoyage() {
      authenticationService.loginWithVoyage();
    }
  }
}());


