(function() {
    'use strict';

    angular
        .module('launchpadApp.core')
        .factory('authorizationInterceptor', authorizationInterceptor)

    authorizationInterceptor.$inject = ['authorizationService', '$state', '$q'];

    function authorizationInterceptor(authorizationService, $state, $q) {

        return {
            request,
            responseError
        };        

        function request(config) {
            const token = authorizationService.getToken();
            if(token){
                config.headers.Authorization = `bearer ${token}`;
            }
            return config;
        }

        function responseError(response) {        
            if(response.status === 401){
                $state.go('login');
            }
            return $q.reject(response);       
        }
    }    
})();



