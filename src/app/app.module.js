(function () {
  'use strict';

  angular
    .module('launchpadApp', [
      'ui.router',
      'launchpadApp.dashboard',
      'launchpadApp.layout',
      'launchpadApp.core',
      'launchpadApp.account',
      'launchpadApp.user',
      'launchpadApp.role'
    ]);
}());

