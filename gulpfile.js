const gulp = require('gulp');
const runSequence = require('run-sequence');
const lazypipe = require('lazypipe');
const browserSync = require('browser-sync').create();
const wiredep = require('wiredep').stream;
const KarmaServer = require('karma').Server;
const plugins = require('gulp-load-plugins')();

const paths = {
  app: './src/app/',
  html: ['./src/**/*.html'],
  data: ['./src/**/*.json'],
  images: ['./src/img/**/*'],
  sass: ['./src/scss/*.scss', './src/app/**/*.scss'],
  js: [
    './src/app/**/*.module.js',
    './src/app/**/*.js',
    '!./src/app/**/*.spec.js'
  ],
  jsOrder: [
    '**/app.module.js',
    '**/*.module.js',
    '**/*.js'
  ]
};


// Default serve task for development, serves files directly from the src/ folder
gulp.task('serve', ['include-bower-dependencies', 'include-dev-js', 'sass', 'watch'], serve);

// Runs Karma tests
gulp.task('test', test);

// Runs ESLint against JavaScript to check for best practices
gulp.task('es-lint', esLint);

// Runs Sass Lint against Sass to check for best practices
gulp.task('sass-lint', sassLint);

// Runs the build process, results in minified concatenated files written to the dist/ folder
gulp.task('build', function(done) {
  runSequence("clean-dist", "copy-images", "copy-fonts", "sourcemaps-babel-concat-minify", done);
});

// Generates environment constants like URL of the API
gulp.task('generate-constants', generateConstants);

// Simply starts a server in the dist folder, useful for testing builds or in older browsers.
gulp.task('serve-dist', function() {
  browserSync.init({
    server: 'dist/'
  });
});

/**
 * Generates ngDocs documentation
 */
gulp.task('ngdocs', [], function () {
  var options = {
    html5Mode: true,
    title: "Voyage Angular Docs"
  };

  return gulp.src(paths.js)
      .pipe(plugins.ngdocs.process(options))
      .pipe(gulp.dest('./docs'));
});


/**
 * NOTE!  All tasks and functions below only exist to support the tasks above and shouldn't need to be run directly.
 */


/**
 * Before starting the server, all bower dependencies and development javascript files are added as
 * script tags into index.html, and sass is compiled to css.
 * The .tmp/ folder is also considered a base directory because while it's where the styles/ folder and css
 * live during development, when built and deployed the styles folder will be right in the base directory,
 * so the path in index.html is just styles/app.css.
 * The routes option lets you map a url as a key to a folder relative to the current directory as a value,
 * so we add the bower_components folder to the server here.
 */
function serve() {
  browserSync.init({
    server: {
      baseDir: ['src/', 'src/.tmp/'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });
}

/**
 * Starts a new Karma server to run unit tests.
 * @param done
 */
function test(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
}


/**
 * Takes all non-test JavaScript files and run ESLint on them with default formatting.
 * failAfterError is set to resolve with an error code if any error level best practices aren't met.
 */
function esLint() {
  return gulp.src(paths.js)
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format())
      .pipe(plugins.eslint.failAfterError());
}


/**
 * Takes all Sass files and runs Sass Lint on them with default formatting.
 * The force element nesting rule is disabled because to override bootstrap styles we often need really specific
 * element nesting, and nesting them inside each other will violate the nesting depth rule, which is more important.
 */
function sassLint() {
  return gulp.src(paths.sass)
    .pipe(plugins.sassLint({
        rules: {
          'force-element-nesting': 0
        }
      }))
    .pipe(plugins.sassLint.format())
    .pipe(plugins.sassLint.failOnError())
}


/**
 * Determines the environment by checking the NODE_ENV environment variable, but defaults to development
 * if none is found.  The template used here is the default template, just with a newline added at the
 * end to comply with the style guide.
 */
function generateConstants() {
  const configJson = require('./src/app/environment-constants/environment-constants.config.json');
  const environmentConfig = configJson[process.env.NODE_ENV || 'development'];
  return plugins.ngConstant({
    name: 'voyage.constants',
    constants: environmentConfig,
    wrap: false,
    stream: true,
    template:
    'angular.module("<%- moduleName %>"<% if (deps) { %>, <%= JSON.stringify(deps) %><% } %>)\n'
    + '<% constants.forEach(function(constant) { %>\n'
    +  '.constant("<%- constant.name %>", <%= constant.value %>)\n'
    +  '<% }) %>\n'
    +  ';\n'
  })
      .pipe(plugins.rename('constants.module.js'))
      .pipe(gulp.dest('./src/app/environment-constants/'));
}


/**
 * Used with the dev serve task to watch for file changes and update the browser
 *
 * For JavaScript, any file change results in a new eslint run. Then if the change was adding, deleting,
 * or renaming the file, automatically update index.html to reflect that change.  Then reload browserSync.
 *
 * For sass on changes the sass task is run.  The browserSync.reload method is called inside the sass task
 * so it's only triggered after the sass to css compilation is complete
 */
gulp.task('watch', function() {
  // JavaScript
  gulp.watch(paths.js, ['es-lint']).on('change', function(event) {
    if (event.type === 'added' || event.type === 'deleted' || event.type === 'renamed') {
      includeDevJs();
    }
    browserSync.reload();
  });

  // Sass
  gulp.watch(paths.sass, ['sass-lint', 'sass']);

  // html
  gulp.watch(paths.html).on('change', browserSync.reload);
});


/**
 * Takes all scss files, compiles them to css, and writes them to the .tmp/styles folder
 * Also sends the resulting css to browserSync so if it's running it can update the styles in the browser
 */
gulp.task('sass', function() {
  return gulp.src('./src/scss/*.scss')
      .pipe(plugins.sass())
      .pipe(gulp.dest("./src/.tmp/styles"))
      .pipe(browserSync.stream());
});


/**
 * Takes all css and javascript referenced in index.html and concatenates each into single files.
 *
 * Looks for <!-- build:css --> and <!-- build:js --> tags in index.html and then looks in the specified
 * directory and outputs to the specified directory.  For example: <!-- build:js(src/) scripts/combined.js -->
 * looks in the src/ folder for all referenced files and concatenates them into scripts/combined.js.
 *
 * Useref takes index.html as the source. Useref's tranformStream parameter can be used to modify the
 * loaded files before concatenation, so we modify them via the initializeSourceMapsThenRunBabel function,
 * which initializes source maps then runs babel on JavaScript files.  The order is important here because
 * we want our sourcemaps to be based on the original non concatenated ES2015 files.
 *
 * After concatenation we use the rev plugin, which generates a revision based on a hash of the content. That
 * hash is appended to each file name (except index.html) to break caching. Then we minify and write the
 * sourcemaps, and finally write the index.html file into the dist folder.
 */
gulp.task('sourcemaps-babel-concat-minify', ["sass"], function() {
  return gulp.src(paths.html)
      .pipe(plugins.useref({}, initializeSourceMapsThenRunBabel()))
      .pipe(plugins.if('!index.html', plugins.rev()))
      .pipe(plugins.if('*.js', plugins.uglify()))
      .pipe(plugins.revReplace())
      .pipe(plugins.sourcemaps.write('maps'))
      .pipe(gulp.dest('dist'));

  function initializeSourceMapsThenRunBabel() {
    return lazypipe()
        .pipe(plugins.sourcemaps.init, { loadMaps: true })
        .pipe(function() {
          return plugins.if('*.js', plugins.babel());
        });
  }
});


/**
 * Uses wiredep to automatically insert script and css link tags for all Bower dependencies
 *
 * Opens index.html and look for <!-- bower:css --> and <!-- bower:js --> tags and inserts any dependencies from Bower.
 * Writes the resulting index.html file back to the src folder.
 */
gulp.task('include-bower-dependencies', function () {
  return gulp.src('src/index.html')
      .pipe(wiredep({
        directory: 'bower_components',
        ignorePath: '..'
      }))
      .pipe(gulp.dest('src/'));
});


/**
 * Uses gulp-inject to insert script tags for all development JavaScript files (excluding tests) in the src folder.
 * Handles including all development JavaScript so developers don't have to worry about the include order and remembering
 * to include all of their JavaScript files.
 */
gulp.task('include-dev-js', includeDevJs);

gulp.task('clean-dist', function () {
  return gulp.src('./dist', {read: false})
      .pipe(plugins.clean());
});

gulp.task('copy-fonts', function() {
  return gulp.src('./src/fonts/*')
      .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('copy-images', function() {
  return gulp.src(paths.images)
      .pipe(plugins.imagemin())
      .pipe(gulp.dest('./dist/img'));
});

gulp.task('default', ['build']);


/** Takes the index.html file as the target, then gets all non-test JavaScript files in proper order via
* getOrderedJsFiles and injects them into index.html as script tags.  The gulp-inject plugin looks for
* <!-- inject:js --> and <!-- endinject --> in index.html and inserts the tags there.  We want the path in the tags to
* be the path relative to index.html, so { relative: true } is passed to gulp inject along with the sorted JavaScript
* files. The resulting index.html file is then written back into the src/ folder, overwriting the original one.
*/
function includeDevJs() {
  const target = gulp.src('src/index.html');
  return target
      .pipe(plugins.inject(getOrderedJsFiles(), {relative: true}))
      .pipe(gulp.dest('src/'));
}


/**
 * Take all files matching the patterns in config.js and order them by
 * the order specified with the patterns in config.jsOrder
 */
function getOrderedJsFiles() {
  return gulp.src(paths.js)
      .pipe(plugins.order(paths.jsOrder))
}
