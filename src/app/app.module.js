(function () {
  'use strict';

  angular
    .module('voyage.app', [
      'voyage.mainNavigation',
      'voyage.dashboard',
      'voyage.layout',
      'voyage.core',
      'voyage.authentication',
      'voyage.examples'
    ]);
}());
