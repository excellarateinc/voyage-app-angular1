(function() {
    'use strict';

    angular
        .module('launchpadApp.account')
        .component('login', {
            templateUrl: 'app/account/login.component.html',
            controller: loginController,
            controllerAs: 'vm'
        });

    loginController.$inject = ['accountService', '$state'];

    function loginController(accountService, $state) {
        const vm = this;
        vm.login = login;

        function login() {        
            accountService.login(vm.username, vm.password)
                .then(() => {
                    $state.go('dashboard');
                });
        }
    }    
})();


