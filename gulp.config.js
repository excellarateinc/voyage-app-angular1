module.exports = function() {
  const app = './src/app/';

  return {
    src: './src/',

    index: './src/index.html',

    css: './src/.tmp/test.css',

    js: [
      app + '**/*.module.js',
      app + '**/*.js',
      '!' + app + '**/*.spec.js'
    ],

    jsOrder: [
      '**/app.module.js',
      '**/*.module.js',
      '**/*.js'
    ]
  };

};
