(function () {
  'use strict';

  angular
    .module('launchpadApp.app', [
      'ui.router',
      'launchpadApp.dashboard',
      'launchpadApp.layout',
      'launchpadApp.core',
      'launchpadApp.account'
    ]);
}());

