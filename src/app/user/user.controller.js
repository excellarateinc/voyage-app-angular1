(function () {
  'use strict';

  angular
    .module('launchpadApp.user')
    .controller('UserController', UserController);

  UserController.$inject = ['userService'];

  function UserController(userService) {
    const vm = this;

    list();

    function list() {
      userService.list()
        .then(users => {
          vm.users = users;
        });
    }
  }
}());


