class AccountService {
    /*@ngInject*/
    constructor($q, $http, authorizationService, coreConstants) {
        this.$q = $q;
        this.$http = $http;
        this.authorizationService = authorizationService;   
        this.constants = coreConstants
    }

    login(username, password) { 
        let deferred = this.$q.defer();

        let content = 'grant_type=password&username=' + username + '&password=' + password;  
     
        this.$http.post(this.constants.apiUrl + '/Token', content, {
            
            headers: { 'Content-Type' :  'application/x-www-form-urlencoded'  }
        })
        .success((response) => {
            this.authorizationService.setToken(response.access_token);
            deferred.resolve(true);
        });
        return deferred.promise;
    }

    getClaims(){
        let deferred = this.$q.defer();
        this.$http.get(this.constants.apiUrl + '/v1/user/claims')
            .then( (response) => {
            deferred.resolve(response.data);
        });
        return deferred.promise;
    }

    register(username, password) {
        let deferred = this.$q.defer();

        let user = {
            email: username,
            password: password,
            confirmPassword: password
        };

        this.$http.post(this.constants.apiUrl + '/v1/account/register', user)
            .then((response) => {
                deferred.resolve(response.data);
            }, 
            (response) => {
                deferred.reject(response.data);
            });

        return deferred.promise;
    }    
}

export default AccountService;

