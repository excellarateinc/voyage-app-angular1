class DashboardController { 

  /*@ngInject*/
  constructor(accountService){
    this.claims = [];
    this.accountService = accountService;
  }

  
   $onInit(){
      this.accountService.getClaims()
        .then( (claims) => {
          this.claims = claims;
        });   
   }

}

const dashboardComponent = {
  templateUrl: 'app/dashboard/dashboard.component.html',
  controller: DashboardController,
  controllerAs: 'vm'
};

export default dashboardComponent;
