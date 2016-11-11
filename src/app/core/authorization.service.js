(function() {
	'use strict';

    angular
        .module('launchpadApp.core')
        .factory('authorizationService', authorizationService);

	function authorizationService() {

		return {
			setToken,
			getToken
		}

		function setToken(token) {
		    this.accessToken = token;
		}

		function getToken() {
		    return this.accessToken;
		}
	}
	
})();