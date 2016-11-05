import angular from 'angular';

import headerComponent from './header.component';

const layoutModule = 
	angular
	.module('layout.module', [])
	.component('headerComponent', headerComponent).name;

export default layoutModule;