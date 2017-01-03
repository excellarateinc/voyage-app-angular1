angular
    .module('launchpadApp.core')
    .provider('routerHelper', routerHelperProvider);

routerHelperProvider.$inject = ['$stateProvider', '$urlRouterProvider'];

function routerHelperProvider($stateProvider, $urlRouterProvider) {
  /* jshint validthis:true */
  this.$get = RouterHelper;

  RouterHelper.$inject = ['$state'];

  function RouterHelper($state) {
    let hasOtherwise = false;

    const service = {
      configureStates,
      getStates
    };

    return service;


    function configureStates(states, otherwisePath) {
      states.forEach(state => $stateProvider.state(state.state, state.config));

      if (otherwisePath && !hasOtherwise) {
        hasOtherwise = true;
        $urlRouterProvider.otherwise(otherwisePath);
      }
    }

    function getStates() {
      return $state.get();
    }
  }
}
