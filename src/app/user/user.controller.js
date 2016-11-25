(function () {
  'use strict';

  angular
    .module('launchpadApp.user')
    .controller('UserController', UserController);

  UserController.$inject = ['userService', 'modalService', '$scope'];

  function UserController(userService, modalService, $scope) {
    const vm = this;
    vm.saveUer = saveUser;
    vm.deleteUser = deleteUser;
    vm.closeModal = closeModal;
    vm.editUser = editUser;
    vm.openUserModal = openUserModal;

    list();

    function list() {
      userService.list()
        .then(users => {
          vm.users = users;
        });
    }

    function saveUser() {
      if (isNewUser()) {
        userService.save(vm.user)
          .then(userCreationSuccess)
      } else {
        userService.update(vm.user)
          .then(userUpdateSuccess);
      }
    }

    function deleteUser() {
      vm.users.splice(index, 1);
    }

    function userCreationSuccess(savedUser) {
      vm.user = savedUser;
      vm.users.push(savedUser);
      modalService.closeModal();
    }

    function userUpdateSuccess(savedUser) {
      vm.user = savedUser;
      modalService.closeModal();
    }

    function isNewUser() {
      return vm.user.id === undefined;
    }

    function closeModal() {
      modalService.cancelModal();
    }

    function editUser(user) {
      openUserModal(user)
    }

    function openUserModal(user) {
      vm.user = user;
      const modalDefaults = {
        animation: true,
        templateUrl: 'app/user/user-modal.html',
        scope: $scope,
        size: 'lg'
      };
      vm.user = user;
      modalService.showModal(modalDefaults, {});

    }

  }
}());


