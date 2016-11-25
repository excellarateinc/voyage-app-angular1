(function () {
    'use strict';

    angular
      .module('launchpadApp.core')
      .factory('modalService', modalService);


    function modalService($uibModal, $uibModalStack, $timeout) {

        return {
            showModal,
            closeModal,
            cancelModal
        };

        function showModal(customModalDefaults, customModalOptions) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return show(customModalDefaults, customModalOptions);
        }

        function show(customModalDefaults, customModalOptions) {
            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'app/common/modal.partial.html'
            };

            var modalOptions = {
                closeButtonText: 'Close',
                actionButtonText: 'OK',
                headerText: 'Proceed?',
                bodyText: 'Perform this action?'
            };

            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in this service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in this service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $uibModalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function (result) {
                        $uibModalInstance.close('ok');
                    };
                    $scope.modalOptions.close = function (result) {
                        $uibModalInstance.close('cancel');
                    };
                };

                tempModalDefaults.controller.$inject = ['$scope', '$uibModalInstance'];
            }
            return $uibModal.open(tempModalDefaults).result;
        }

        function closeModal() {
            //wait for some time so user can see any messages appear in the dialog box
            $timeout(function() {
                $uibModalStack.dismissAll('cancel')
            }, 200);
        }

        function cancelModal() {
            $uibModalStack.dismissAll('cancel')
        }
    }

})();
