(function () {
  'use strict';

  angular
    .module('launchpadApp.dashboard')
    .controller('DashboardController', DashboardController);

  function DashboardController() {
    const vm = this;

    // TODO: Remove prototyping chart code below.
    vm.labels = ["January", "February", "March", "April", "May", "June", "July"];
    vm.series = ['Series A', 'Series B'];
    vm.data = [
      [65, 59, 50, 51, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 70]
    ];
    vm.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }
        ]
      }
    };
  }

}());




