
class HeaderController { 
	/*@ngInject*/
	constructor(authorizationService, $state) {
		this.authorizationService = authorizationService;
		this.$state = $state;
		this.authToken = this.authorizationService.getToken();
	}

    logout() {
        this.authorizationService.setToken(null);
        this.$state.go("login");        
    }	
}

const headerComponent = {
    templateUrl: 'app/layout/header.component.html',
    controller: HeaderController,
    controllerAs: 'vm'
};

export default headerComponent;
