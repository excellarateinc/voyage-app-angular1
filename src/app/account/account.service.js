(function() {
    'use strict';
    
    angular
        .module('launchpadApp.account')
        .factory('accountService', accountService);

    accountService.$inject = ['$http', 'authorizationService', '$q'];

    function accountService($http, authorizationService, $q) {
     
         return  {
            login,
            register
         };

        function login(username, password) { 
            const content = "grant_type=password&username=" + username + "&password=" + password;  
         
            return this.$http.post(`${this.baseApi}/Token`, content, {
                headers: { 'Content-Type' :  'application/x-www-form-urlencoded'  }
            })
            .then(response => {
                this.authorizationService.setToken(response.data.access_token);
            });
        }

        function register(username, password) {
            const user = {
                email: username,
                password: password,
                confirmPassword: password
            };

            return this.$http.post(`${this.baseApi}/v1/account/register`, user)
                .then(response => response.data)
                .catch(failure => { 
                    return this.$q.reject(failure.data);
                });
        }    
    }        
})();




