(function () {
  'use strict';

  angular
    .module('launchpadApp.app', [
      'launchpadApp.mainNavigation',
      'launchpadApp.dashboard',
      'launchpadApp.layout',
      'launchpadApp.core',
      'launchpadApp.authentication'
    ]);
}());

