
class AuthorizationInterceptor {
    /*@ngInject*/
    constructor(authorizationService, $state) {           
        this.authorizationService = authorizationService;
        this.$state = $state;   

        /* This fixes the issue that Angular doesn't like an interceptor 
           bound to a class when it's expecting a function. */
        return {
            request: this.request.bind(this),
            responseError: this.responseError.bind(this)
        }  
    }

    request(config) {
        const token = this.authorizationService.getToken();
        if(token){
            config.headers.Authorization = `bearer ${token}`;
        }
        return config;
    }

    responseError(response) {        
        if(response.status === 401){
            this.$state.go('login');
        }        
    }
}

export default AuthorizationInterceptor;