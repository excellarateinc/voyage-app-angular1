(function () {
  'use strict';

  angular
    .module('voyage.authentication')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['authenticationService'];

  function LoginController(authenticationService) {
    const vm = this;
    vm.oauthLogin = authenticationService.goToOauthLogin;
  }

}());


