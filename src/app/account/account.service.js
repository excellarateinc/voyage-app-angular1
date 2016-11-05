class AccountService {
    /*@ngInject*/
    constructor($q, $http, authorizationService) {
        this.$q = $q;
        this.$http = $http;
        this.authorizationService = authorizationService;   
        this.baseApi = "http://localhost:52431/api";
    }
 
    login(username, password) { 
        const content = "grant_type=password&username=" + username + "&password=" + password;  
     
        return this.$http.post(`${this.baseApi}/Token`, content, {
            headers: { 'Content-Type' :  'application/x-www-form-urlencoded'  }
        }).then(response => {
            this.authorizationService.setToken(response.data.access_token);
        });
    }

    register(username, password) {
        const user = {
            email: username,
            password: password,
            confirmPassword: password
        };

        return this.$http.post(`${this.baseApi}/v1/account/register`, user)
            .then((response) => {
                return response.data;
            });       
    }    
}

export default AccountService;

