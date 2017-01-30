/* eslint-disable no-undef */
/* eslint-disable angular/definedundefined */

(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name core.service:platformHelper
   * @description
   * Helper service for determining where Voyage is running.  Encapsulates the logic of checking if ionic is defined
   * to one place.  Allows individual modules to be coded once and run in the Ionic app or the vanilla Angular app by
   * allowing developers to see which environment they are in.  It can also differentiate between Ionic running in
   * a web browser (like during development with ionic serve) and Ionic running as a mobile app on a physical device,
   * which is useful for determining if you should use phone hardware features.
   */
  angular
    .module('voyage.core')
    .factory('platformHelper', platformHelper);

  platformHelper.$inject = [];

  function platformHelper() {

    const service = {
      isIonic,
      isRunningAsMobileApp,
      isIOS,
      isAndroid
    };

    return service;

    /**
     * @ngdoc method
     * @name isIonic
     * @methodOf core.service:platformHelper
     * @description
     *
     * @returns {Boolean} True if you are in the Ionic version of Voyage, false if you are in vanilla Angular
     */
    function isIonic() {
      return typeof ionic !== "undefined";
    }

    /**
     * @ngdoc method
     * @name isRunningAsMobileApp
     * @methodOf core.service:platformHelper
     * @description
     *
     * @returns {Boolean} True if you are running as a mobile app on a device (i.e. through 'ionic emulate', 'ionic run',
     * installed from app store, or run from XCode).
     */
    function isRunningAsMobileApp() {
      return typeof ionic !== "undefined" && ionic.Platform.isWebView();
    }

    /**
     * @ngdoc method
     * @name isIOS
     * @methodOf core.service:platformHelper
     * @description
     *
     * @returns {Boolean} True if Ionic determines it should display the iOS version.  This is not exclusive to running
     * on a real device, during 'ionic serve -lab' this will evaluate to true in the iOS iframe.
     */
    function isIOS() {
      return typeof ionic !== "undefined" && ionic.Platform.isIOS();
    }

    /**
     * @ngdoc method
     * @name isAndroid
     * @methodOf core.service:platformHelper
     * @description
     *
     * @returns {Boolean} True if Ionic determines it should display the Android version.  This is not exclusive to running
     * on a real device, during 'ionic serve -lab' this will evaluate to true in the Android iframe.
     */
    function isAndroid() {
      return typeof ionic !== "undefined" && ionic.Platform.isAndroid();
    }
  }

}());
