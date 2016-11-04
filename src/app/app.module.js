import angular from 'angular';
import 'angular-ui-router';
import 'angular-sanitize';

import '../scss/app.scss';

import appComponent from './application.component';
import appConfig from './app.config';

import dashboardModule from 'dashboard/dashboard.module';
import headerModule from 'header/header.module';
import coreModule from 'core/core.module';
import accountModule from 'account/account.module';

angular
  .module('lss-launchpad', ['ui.router', dashboardModule, headerModule, coreModule, accountModule])
  .config(appConfig)
  .component('app', appComponent);

angular
  .element(document)
  .ready(() => angular.bootstrap(document, ['lss-launchpad']));

