

function appConfig($stateProvider, $urlRouterProvider, $httpProvider){
	/*@ngInject*/
        
    //Configure http interceptors
    $httpProvider.interceptors.push('authorizationInterceptor');

    //Configure default route
    $urlRouterProvider.otherwise('/login');

    //Configure ui states
    var states = [
    { 
        name: 'login', 
        url: '/login',
        views: {
            content: {
                // Using component: instead of template:
                component: 'loginComponent'
            },
            header: {
                component: 'headerComponent'
            }
        }         
    },
    { 
        name: 'register', 
        url: '/register',
        views: {
            content: {
                // Using component: instead of template:
                component: 'registerComponent'
            },
            header: {
                component: 'headerComponent'
            }
        }         
    },    
    {
        name: 'dashboard',
        url: '/dashboard',
        views: {
            content: {                
                component: 'dashboardComponent'
            },
            header: {
                component: 'headerComponent'
            }
        }
    }];

    // Loop over the state definitions and register them
    states.forEach(function(state) {
        $stateProvider.state(state);
    });
}