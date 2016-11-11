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
var gulpIf = require('gulp-if');

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
    .pipe(uglify())
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

gulp.task('concat', ["sass", "babel"], function(done) {
  return gulp.src(paths.html)
    .pipe(useref({
        transformPath: function(filePath) {          
          if (filePath.indexOf('/node_modules/') === -1) {            
            return filePath.replace('/src/', '/dist/')
          }
          return filePath;
        }
    }, lazypipe().pipe(sourcemaps.init, { loadMaps: true })))    
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', ['clean'], function(done) {
  return gulp.src(paths.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./dist/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest('./dist/css/'));
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
  runSequence("clean", "copy-images", "copy-fonts", "sass", "babel", "concat", done);
});

gulp.task('default', ['build']);