(function () {
  'use strict';

  angular
    .module('launchpadApp', [
      'ui.router',
      'ui.bootstrap',
      'toaster',
      'launchpadApp.dashboard',
      'launchpadApp.layout',
      'launchpadApp.core',
      'launchpadApp.account',
      'launchpadApp.user',
      'launchpadApp.role'
    ]);
}());

