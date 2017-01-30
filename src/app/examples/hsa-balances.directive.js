(function () {
  'use strict';

  angular.module('voyage.examples')
      .directive("hsaBalances", hsaBalances);

  function hsaBalances() {
    return {
      restrict: 'E',
      templateUrl: 'app/examples/hsa-balances.directive.html',
      scope: {
      },
      link(scope) {
        scope.colors = ['#3cbfa4', '#3793cc', '#f15e2b'];
        scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        scope.series = ['HSA Balance', 'FSA Balance'];
        scope.data = [
          [900, 1020, 2100, 1900, 3000, 4100, 5000],
          [150, 480, 730, 1500, 1100, 900, 1200]
        ];

        scope.options = {
          legend: {
            display: true,
            position: 'top'
          },
          maintainAspectRatio: false,
          scales: {
            yAxes: [

              {
                id: 'y-axis-2',
                type: 'linear',
                display: true,
                position: 'left'
              }
            ]
          }
        };

        scope.doughnutHsaData = [3000, 1500, 500];
        scope.doughnutFsaData = [400, 300, 500];

        scope.doughnutLabels = ["Available Balance", "Investment Balance", "Pending Contributions"];
        scope.doughnutColors = ['#3793cc', '#3cbfa4', '#cccccc'];

        scope.doughnutOptions = {
          legend: {
            display: true,
            position: 'top',
            horizontalAlign: 'left'
          }
        };
      }
    };
  }
}());
