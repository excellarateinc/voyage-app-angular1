(function() {
    'use strict';

    angular
        .module('launchpadApp.layout')
        .component('header', {
            templateUrl: 'app/layout/header.component.html',
            controller: headerController,
            controllerAs: 'vm'            
        });

        headerController.$inject = ['authorizationService', '$state'];

        function headerController(authorizationService, $state) { 
            const vm = this;
            vm.logout = logout;
            vm.authToken = authorizationService.getToken()

            function logout() {
                authorizationService.setToken(null);
                $state.go("login");        
            }   
        }
})();




