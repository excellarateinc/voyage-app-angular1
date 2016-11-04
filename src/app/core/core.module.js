import angular from 'angular';

import AuthorizationInterceptor from './authorization.interceptor';
import AuthorizationService from './authorization.service';
import ErrorService from './error.service';

const coreModule = 
	angular
	.module('core.module', [])
	.service('authorizationInterceptor', AuthorizationInterceptor)
	.service('authorizationService', AuthorizationService)
	.service('errorService', ErrorService).name;

export default coreModule;