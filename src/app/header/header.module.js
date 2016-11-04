import angular from 'angular';

import headerComponent from './header.component';
import secureHeaderComponent from './secure.header.component';

const headerModule = 
	angular
	.module('header.module', [])
	.component('headerComponent', headerComponent)
	.component('secureHeaderComponent', secureHeaderComponent).name;

export default headerModule;