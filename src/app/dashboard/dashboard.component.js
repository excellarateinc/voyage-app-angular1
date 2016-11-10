(function() {
	'use strict';

	angular
		.module('launchpadApp.dashboard')
		.component('dashboard', {
			templateUrl: 'app/dashboard/dashboard.component.html',
			controller: dashboardController,
			controllerAs: 'vm'			
		});

		function dashboardController() { }

})();




