(function () {
  'use strict';

  angular
    .module('voyage.core')
    .factory('errorService', errorService);

  function errorService() {

    return {
      getModelStateErrors
    };

    function getModelStateErrors(failure) {
      let errors = [];
      if(failure.modelState) {
        errors = Object.keys(failure.modelState).map(key => failure.modelState[key]);
      }
      return errors;
    }
  }

}());


