(function () {
  'use strict';

  angular
    .module('launchpadApp.app', [
      'ui.router',
      'launchpadApp.mainNavigation',
      'launchpadApp.dashboard',
      'launchpadApp.layout',
      'launchpadApp.core',
      'launchpadApp.account'
    ]);
}());

