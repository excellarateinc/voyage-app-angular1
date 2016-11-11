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

var paths = {
  html: ['./src/**/*.html'],
  data: ['./src/**/*.json'],
  images: ['./src/img/**/*'],
  js: ['./src/app/**/*.js', '!./src/app/**/*.spec.js'],
  sass: ['./src/scss/**/*.scss']
};

gulp.task('clean', function (done) {
  gulp.src('./dist', {read: false})
    .pipe(clean())
    .on('end', done);
});

gulp.task('babel', function(done) {
  gulp.src(paths.js)
    .pipe(babel())
    .pipe(gulp.dest('./dist/app'))
    .on('end', done);
});

gulp.task('copy-fonts', function(done) {
  gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./dist/fonts'))
    .on('end', done);
});

gulp.task('copy-images', function(done) {
  gulp.src(paths.images)
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
    .on('end', done);
});

gulp.task('concat', ["babel"], function(done) {
  gulp.src(paths.html)
    .pipe(useref({
        transformPath: function(filePath) {          
          if (filePath.indexOf('/src/app') !== -1) {
            gutil.log(filePath);
            return filePath.replace('/src/app', '/dist/app')
          }
          return filePath;
        }
    }, lazypipe().pipe(sourcemaps.init, { loadMaps: true })))
    .pipe(gulpif('*.scss', sass()))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist'))
    .on('end', done);
});

gulp.task('sass', function(done) {
  gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./dist/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest('./dist/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['babel']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.images, ['copy-images']);
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

gulp.task('build', function(done) {
  runSequence("clean", "copy-images", "copy-fonts", "babel", "concat", done);
});

gulp.task('awesome', ["clean", "copy-images", "copy-fonts", "babel", "concat"]);

gulp.task('default', ['build']);