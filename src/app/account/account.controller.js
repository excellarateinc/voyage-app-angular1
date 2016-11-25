(function () {
  'use strict';

  angular
    .module('launchpadApp.account')
    .controller('AccountController', AccountController);

  AccountController.$inject = ['$state'];

  function AccountController($state) {
    const vm = this;
    vm.isActive = isActive;

    function isActive(tabName) {
      return ($state.current.name === tabName)
    }

  }
}());


