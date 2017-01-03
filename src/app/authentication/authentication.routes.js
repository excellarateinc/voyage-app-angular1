angular
    .module('launchpadApp.authentication')
    .run(appRun);

function appRun($location, routerHelper, tokenService) {
  routerHelper.configureStates(getStates());

  if (!tokenService.getToken()) {
    $location.path('/account/login');
  }
}

function getStates() {
  return [
    {
      state: 'login',
      config: {
        url: '/account/login',
        templateUrl: 'app/authentication/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      }
    },

    {
      state: 'register',
      config: {
        url: '/account/register',
        templateUrl: 'app/authentication/register/register.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
      }
    }
  ];
}
