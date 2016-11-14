(function () {
  'use strict';

  angular
    .module('launchpadApp.dashboard')
    .component('dashboard', {
      templateUrl: 'app/dashboard/dashboard.component.html',
      controller: DashboardController,
      controllerAs: 'vm'
    });

  function DashboardController() { }

}());




