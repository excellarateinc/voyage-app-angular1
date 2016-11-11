(function() {
    'use strict';

    angular
        .module('launchpadApp.core')
        .factory('errorService', errorService);

    function errorService() {

        return {
            getModelStateErrors
        }

        function getModelStateErrors(failure) {
            let errors = [];
            if(failure.modelState){
                for(let key in failure.modelState){
                    let states = failure.modelState[key];
                    for(let i = 0; i < states.length; ++i){
                        errors.push(states[i]);
                    }
                }
            }
            return errors;        
        }
    }

})();


