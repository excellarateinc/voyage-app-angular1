(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name authentication.service:authenticationService
   * @description
   * Handles oauth2 business logic
   */
  angular
    .module('voyage.authentication')
    .factory('authenticationService', authenticationService);

  authenticationService.$inject = ['$window', '$http', '$location', '$rootScope', '$state', '$injector', 'tokenService', 'platformHelper', 'API_URL', 'SERVER_URL', 'OAUTH_CLIENT_ID', 'OAUTH_REDIRECT_URL'];

  function authenticationService($window, $http, $location, $rootScope, $state, $injector, tokenService, platformHelper, API_URL, SERVER_URL, OAUTH_CLIENT_ID, OAUTH_REDIRECT_URL) {
    let $ionicHistory;
    let $cordovaInAppBrowser;

    if (platformHelper.isIonic()) {
      $ionicHistory = $injector.get('$ionicHistory');
      $cordovaInAppBrowser = $injector.get('$cordovaInAppBrowser');
    }

    return {
      initialize,
      goToOauthLogin,
      register,
      logout
    };

    /**
     * @ngdoc method
     * @name initialize
     * @methodOf authentication.service:authenticationService
     * @description
     * To be run on app startup.  Redirects to the login page if no auth token is found.  Detects if the
     * app is being started via a redirect from the oauth process.  If so grabs the token, stores it, and places it
     * on the http header.
     */
    function initialize() {
      redirectToLoginIfNoToken();
      handleEntryFromOauthRedirect();
    }

    /**
     * @ngdoc method
     * @name goToOauthLogin
     * @methodOf authentication.service:authenticationService
     * @description
     * Triggers navigation to the oauth login screen.  When Voyage is running as a mobile app the login screen will open
     * in an in app browser.
     */
    function goToOauthLogin() {
      const RESPONSE_TYPE = 'token';
      const oauthUrl = `${ SERVER_URL }/oauth/authorize?client_id=${ OAUTH_CLIENT_ID }&redirect_uri=${ encodeURIComponent(OAUTH_REDIRECT_URL) }&response_type=${ RESPONSE_TYPE }&scope=email`;

      if (platformHelper.isRunningAsMobileApp()) {
        const onLoadStart = $rootScope.$on('$cordovaInAppBrowser:loadstart', ionicOnOauthCallbackStoreToken); // eslint-disable-line no-unused-vars
        $cordovaInAppBrowser.open(oauthUrl);
        return;
      }

      $window.location.href = oauthUrl;
    }

    /**
     * @ngdoc method
     * @name register
     * @methodOf authentication.service:authenticationService
     * @description
     * Registers new users
     *
     * @param {string} email User's email
     * @param {string} firstName User's first name
     * @param {string} lastName User's last name
     * @param {string} password Users's password
     * @param {string} confirmPassword User's password
     *
     * @returns {Promise} A promise that will resolve with the data returned by the register api endpoint
     */
    function register(email, firstName, lastName, password, confirmPassword) {
      const user = {
        email,
        firstName,
        lastName,
        password,
        confirmPassword
      };

      return $http.post(`${API_URL}/account/register`, user)
        .then(response => response.data);
    }

    /**
     * @ngdoc method
     * @name logout
     * @methodOf authentication.service:authenticationService
     * @description
     * Deletes the authentication token from local storage and redirects to the login page
     */
    function logout() {
      tokenService.deleteToken();
      $state.go('login');
    }

    function redirectToLoginIfNoToken() {
      if (!$location.search().access_token && !tokenService.getToken()) {
        $state.go('login');
      }
    }

    function handleEntryFromOauthRedirect() {
      let accessToken = $location.search().access_token;

      // FIXME: The following if block is a temporary fix to handle the fact that java returns the access token as a query parameter '?'
      // but the .net version returns the access token as a url fragment '#'.  We should unify the API side so this isn't necessary.
      if (!accessToken) {
        const tokenIndex = $location.path().indexOf('access_token');
        if (tokenIndex !== -1) {
          const paramLength = 'access_token='.length;
          accessToken = $location.path().substring(tokenIndex + paramLength, $location.path().indexOf('&'));
        }
      }

      if (accessToken) {
        const expiresIn = parseInt($location.search().expires_in);
        const expirationDate = convertExpiresInSecondsToExpirationDate(expiresIn);
        tokenService.setToken(accessToken, expirationDate);
        placeTokenOnHttpHeader(accessToken);
      }
    }

    function placeTokenOnHttpHeader(token) {
      $http.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    function convertExpiresInSecondsToExpirationDate(expiresIn) {
      const expirationDate = new Date();
      expirationDate.setSeconds(expirationDate.getSeconds() + expiresIn);
      return expirationDate;
    }

    function getParameterByName(name, url) {
      const fixedName = name.replace(/[[\]]/g, "\\$&");
      const regex = new RegExp(`[?&]${fixedName}(=([^&#]*)|&|#|$)`);
      const results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function ionicOnOauthCallbackStoreToken(angularEvent, inAppBrowserEvent) {
      const accessToken = getParameterByName('access_token', inAppBrowserEvent.url);

      if (accessToken) {
        const expiresInParam = getParameterByName('expires_in', inAppBrowserEvent.url);
        const expiresIn = parseInt(expiresInParam);
        const expirationDate = convertExpiresInSecondsToExpirationDate(expiresIn);
        tokenService.setToken(accessToken, expirationDate);
        placeTokenOnHttpHeader(accessToken);
        $cordovaInAppBrowser.close();
        $ionicHistory.clearCache()
          .then(() => $location.url('/'));
      }
    }
  }
}());
