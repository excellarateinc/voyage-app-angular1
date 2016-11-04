class AccountService {
    /*@ngInject*/
    constructor($q, $http, authorizationService) {
        this.$q = $q;
        this.$http = $http;
        this.authorizationService = authorizationService;   
    }

    login(username, password) { 
        let deferred = this.$q.defer();

        let content = "grant_type=password&username=" + username + "&password=" + password;  
     
        this.$http.post("/Token", content, {
            headers: { 'Content-Type' :  'application/x-www-form-urlencoded'  }
        })
        .success(function(response){
            this.authorizationService.setToken(response.access_token);
            deferred.resolve(true);
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

        this.$http.post("/api/account/register", user)
            .then(function(response){
                deferred.resolve(response.data);
            }, 
            function(response){
                deferred.reject(response.data);
            });

        return deferred.promise;
    }    
}

export default AccountService;

