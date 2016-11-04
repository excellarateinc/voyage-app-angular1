
class AuthorizationInterceptor {
    /*@ngInject*/
    constructor($q, authorizationService, $state) {   
        this.$q = $q;
        this.authorizationService = authorizationService;
        this.$state = $state;   

        return {
            request: this.request.bind(this),
            responseError: this.responseError.bind(this)
        }  
    }

    request(config) {
        let token = this.authorizationService.getToken();
        if(token){
            config.headers.Authorization = 'bearer ' + token;
        }
        return config;
    }

    responseError(response) {
        let deferred = this.$q.defer();
        if(response.status == 401){
            this.$state.go('login');
        }
        deferred.reject(response);
        return deferred.promise;        
    }
}

export default AuthorizationInterceptor;