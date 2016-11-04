class SecureHeaderController { 
    /*@ngInject*/
    constructor(authorizationService, $state) {
        this._authorizationService = authorizationService;
        this._$state = $state;
    }

    logout() {
        this._authorizationService.setToken(null);
        this._$state.go("login");        
    }
}

const secureHeaderComponent = {
    templateUrl: 'app/header/secure.header.component.html',
    controller: SecureHeaderController,
    controllerAs: 'vm',
    bindings: {
        Binding: '='
    }  
};

export default secureHeaderComponent;

