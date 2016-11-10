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
            function logout() {
                authorizationService.setToken(null);
                $state.go("login");        
            }   
        }
})();




