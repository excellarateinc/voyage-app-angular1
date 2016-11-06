class LoginController {
    /*@ngInject*/ 
    constructor(accountService, $state) {
        this.accountService = accountService;
        this.$state = $state;

        this.username = 'admin@admin.com';
        this.password = 'Hello123!';
    }

    login() {        
        this.accountService.login(this.username, this.password)
            .then(() => {
                this.$state.go('dashboard');
            });
    }    
}

const loginComponent = {
    templateUrl: 'app/account/login.component.html',
    controller: LoginController,
    controllerAs: 'vm'
};

export default loginComponent;
