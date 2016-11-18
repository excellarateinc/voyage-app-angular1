var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var shell = require('gulp-shell');
var ngConstant = require('gulp-ng-constant');
var request = require('request');
var fs = require('fs');
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var useref = require('gulp-useref');
var lazypipe = require('lazypipe');
var gulpif = require('gulp-if');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync').create();
const gulpOrder = require('gulp-order');
const gulpInject = require('gulp-inject');
const debug = require('gulp-debug');
const wiredep = require('wiredep').stream;

const config = require('./gulp.config')();


var paths = {
  html: ['./src/**/*.html'],
  data: ['./src/**/*.json'],
  images: ['./src/img/**/*'],
  js: ['./src/app/**/*.js', '!./src/app/**/*.spec.js'],
  sass: ['./src/scss/*.scss']
};

gulp.task('clean', function (done) {
  return gulp.src('./dist', {read: false})
    .pipe(clean());
});

gulp.task('babel', ['clean', 'sass'], function(done) {
  return gulp.src(paths.js)
    .pipe(babel())
    .pipe(gulp.dest('./dist/app'));
});

gulp.task('copy-fonts', function(done) {
  return gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('copy-images', function(done) {
  return gulp.src(paths.images)
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('concat', ["sass"], function(done) {
  return gulp.src(paths.html)
    .pipe(useref({}, lazypipe().pipe(sourcemaps.init, { loadMaps: true }).pipe(babel)))
    .pipe(gulpif('*.js', uglify()))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist'));
});



gulp.task('generate-constants', function() {
  var configJson = require('./src/app/environment-constants/environment-constants.config.json');
  var environmentConfig = configJson[process.env.NODE_ENV || 'development'];
  return ngConstant({
    name: 'launchpad.constants',
    constants: environmentConfig,
    stream: true,
    wrap: false
  })
	.pipe(gulp.dest('./src/app/environment-constants'))
});


gulp.task('lint', function() {
    // ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
    return gulp.src(paths.js)
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError());
});

gulp.task('build', function(done) {
  runSequence("clean", "copy-images", "copy-fonts", "sass", "babel", "concat", done);
});

gulp.task('default', ['build']);

// Static server
gulp.task('browser-sync', ['sass'], function() {
  browserSync.init({
    server: {
      baseDir: ['src/', 'src/.tmp/'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch(paths.js, ['lint']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html).on('change', browserSync.reload);

});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src('./src/scss/*.scss')
      .pipe(sass())
      .pipe(gulp.dest("./src/.tmp/styles"))
      .pipe(browserSync.stream());
});


/**
 * Uses wiredep to automatically insert script and css link tags for all Bower dependencies
 */
gulp.task('bower', function () {
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
 *
 * Takes the index.html file as the target, then gets all non-test JavaScript files in proper order via
 * getOrderedJsFiles and injects them into index.html as script tags.  The gulp-inject plugin looks for
 * <!-- inject:js --> and <!-- endinject --> in index.html and inserts the tags there.  We want the path in the tags to
 * be the path relative to index.html, so { relative: true } is passed to gulp inject along with the sorted JavaScript
 * files. The resulting index.html file is then written back into the src/ folder, overwriting the original one.
 */
gulp.task('inject-js', function() {
  var target = gulp.src('src/index.html');
  return target
  .pipe(gulpInject(getOrderedJsFiles(), {relative: true}))
  .pipe(gulp.dest('src/'));

});

/**
 * Take all files matching the patterns in config.js and order them by
 * the order specified with the patterns in config.jsOrder
 */
function getOrderedJsFiles() {
  return gulp.src(config.js)
      .pipe(gulpOrder(config.jsOrder))
}
