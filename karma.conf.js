// Karma configuration

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: './src',

    plugins: [
     'karma-jasmine',
     'karma-phantomjs-launcher',
     'karma-chrome-launcher',
     'karma-babel-preprocessor'
    ],

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    preprocessors: {
      'app/**/*.js': ['babel']
    },

    babelPreprocessor: {
      options: {
        presets: ['es2015']
      }
    },

    // list of files / patterns to load in the browser
    files: [
      '../bower_components/angular/angular.js',
      '../bower_components/angular-ui-router/release/angular-ui-router.js',
      '../bower_components/angular-mocks/angular-mocks.js',
      'app/app.module.js',
      'app/**/*.module.js',
      'app/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 9876,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO
  });
};
