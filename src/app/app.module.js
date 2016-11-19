(function () {
  'use strict';

  angular
    .module('launchpadApp.app', [
      'ui.router',
      'ui.bootstrap',
      'angularBootstrapMaterial',
      'chart.js',
      'launchpadApp.dashboard',
      'launchpadApp.layout',
      'launchpadApp.core',
      'launchpadApp.account'
    ]);
}());

