import angular from 'angular';

import dashboardComponent from './dashboard.component';

const dashboardModule = 
	angular
	.module('dashboard.module', [])
	.component('dashboardComponent', dashboardComponent).name;

export default dashboardModule;