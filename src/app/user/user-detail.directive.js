(function () {
    'use strict';

    angular.module('launchpadApp.user')
      .directive("userDetail", UserDetail);

    UserDetail.$inject = ['userService', 'modalService'];

    //////////////

    function UserDetail(userService,  modalService) {
        return {
            restrict: 'E',
            templateUrl: 'app/user/user-detail.directive.html',
            scope: {
                user: '=',
                onDelete: '=',
                onEdit: '=',
                index: '=',
            },
            link: function (scope) {
                scope.deleteUser = deleteUser;
                scope.editUser = editUser;
                scope.cancel = cancel;

                const modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Delete User',
                    bodyText: 'Are you sure you want to delete this user ?'
                };

                function editUser() {
                    console.log(scope.user);
                    scope.onEdit(scope.user)
                }

                function deleteUser() {
                    openDeleteConfirmationModal()
                      .then(clickedButton => {
                          if (clickedButton === 'ok') {
                              performDelete()
                          }
                      });
                }

                function performDelete() {
                    if (isNewUser()) {
                        scope.onDelete(scope.index);
                    } else {
                        userService.deleteUser(scope.user.id)
                          .then(() => scope.onDelete(scope.index));
                    }
                }

                function openDeleteConfirmationModal() {
                    modalOptions.headerText = 'Delete ' + scope.user.firstName + ' ?';
                    return modalService.showModal({}, modalOptions);
                }

                function isNewUser() {
                    return scope.user.id === undefined;
                }

                function cancel() {
                    modalService.cancelModal();
                }
            }
        };
    }
})();
