import angular from 'angular';

import loginComponent from './login.component';
import registerComponent from './register.component';
import accountService from './account.service';

const accountModule = 
	angular
	.module('account.module', [])
	.component('loginComponent', loginComponent)
	.component('registerComponent', registerComponent)
	.service('accountService', accountService).name;

export default accountModule;