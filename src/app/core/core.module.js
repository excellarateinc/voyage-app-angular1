import angular from 'angular';

import AuthorizationInterceptor from './authorization.interceptor';
import AuthorizationService from './authorization.service';
import ErrorService from './error.service';

const coreModule = 
	angular
	.module('core.module', [])
	.constant('coreConstants', {
		apiUrl: 'http://localhost:52431/api'
	})
	.service('authorizationInterceptor', AuthorizationInterceptor)
	.service('authorizationService', AuthorizationService)
	.service('errorService', ErrorService).name;

export default coreModule;