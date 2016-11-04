class RegisterController {
    /*@ngInject*/ 
    constructor(accountService, $state, errorService) {
        this.accountService = accountService;
        this.$state = $state;
        this.errorService = errorService;

        this.username = '';
        this.password = '';
        this.confirmPassword = '';
        this.registrationErrors = [];
    }

    register(){
        if(this.password == this.confirmPassword){
            this.accountService.register(this.username, this.password).then(
                function(){
                    this.registrationErrors = [];
                    this.$state.go('login');
                },
                function(failure){
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
    controllerAs: 'vm',
    bindings: {
        Binding: '='
    }
};

export default registerComponent;

