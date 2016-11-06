class RegisterController {
    /*@ngInject*/ 
    constructor(accountService, $state, errorService) {
        this.accountService = accountService;
        this.$state = $state;
        this.errorService = errorService;
    }

    register(){
        if(this.password === this.confirmPassword){
            this.accountService.register(this.username, this.password)
                .then(() => {
                    this.registrationErrors = [];
                    this.$state.go('login');
                })
                .catch(failure => {
                    var errors = this.errorService.getModelStateErrors(failure);
                    this.registrationErrors = errors;
                }
            );
        }
        else{
            this.registrationErrors = ['Passwords must match'];
        }
    }    
}

const registerComponent = {
    templateUrl: 'app/account/register.component.html',
    controller: RegisterController,
    controllerAs: 'vm'
};

export default registerComponent;

