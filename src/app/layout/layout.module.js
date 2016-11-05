import angular from 'angular';

import headerComponent from './header.component';
import sidebarComponent from './sidebar.component';

const layoutModule = 
	angular
	.module('layout.module', [])
	.component('headerComponent', headerComponent)
	.component('sidebarComponent', sidebarComponent).name;

export default layoutModule;