var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var minifyHTML = require('gulp-minify-html');
var gulpif = require('gulp-if');
var less = require('gulp-less');

var dist = '../dist';
// JS Hint
// Ignored files refer to file .jshintignore
gulp.task('jshint', ['clean:jshint'], function () {
  var jshint = require('gulp-jshint');
  return gulp.src(['../web/scripts/**/*.js', '../node-app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('gulp-jshint-html-reporter', {
      filename: '../web/jshint/jshint.html',
      createMissingFolders: true
    }));
});

// copy all node-app file
gulp.task('node-app', function (cb) {
  return gulp.src('../node-app/**/*.*')
    .pipe(gulpif('*.js', uglify().on('error', gutil.log)))
    .pipe(gulpif('*.json', minifyHTML()))
    .pipe(gulp.dest(dist + '/node-app'));
});

// copy all the third libs
gulp.task('lib', function (cb) {
  return gulp.src('../web/lib/**/*.*')
    .pipe(gulp.dest(dist + '/web/lib'))
});

// copy all the third libs
gulp.task('others', function (cb) {
  return gulp.src(['../package.json'])
    .pipe(gulp.dest(dist));
});

// copy the files in the web folder
gulp.task('web', ['less'], function (cb) {
  var cleanCSS = require('gulp-clean-css');
  var cssOption = {
    compatibility: ''
  };
  return gulp.src(['../web/**/*.*',
      '!../web/lib/**/*.*',
      '!../web/jshint/**/*.*',
      // ignore less source files
      '!../web/**/*.less'
    ])
    .pipe(gulpif('*.js', uglify().on('error', gutil.log)))
    .pipe(gulpif('*.json', minifyHTML()))
    // '' or '*' (default) - Internet Explorer 9+ compatibility mode
    .pipe(gulpif('*.css', cleanCSS(cssOption)))
    .pipe(gulp.dest(dist + '/web'));
});

// generate css in the web folder
gulp.task('less', function (cb) {
  return gulp.src('../web/styles/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('../web/styles/css'));
});

gulp.task('clean', ['clean:jshint'], function () {
  var del = require('del');
  return del.sync([
    dist
  ], {
    force: true
  });
});

gulp.task('clean:jshint', function () {
  var del = require('del');
  return del.sync([
    '../web/jshint'
  ], {
    force: true
  });
});


function watchNodeJS() {
  var nodemon = require('gulp-nodemon');
  nodemon({
      // restart app.js with delay 2s
      script: '../node-app/app.js',
      delay: '2s',
      // only watch files in the node-app with extension: .js, .properties, .json
      watch: ['../node-app'],
      ext: 'js properties json',
      tasks: ['jshint'],
      // output the details
      verbose: true
    })
    .on('restart', function () {
      console.log('nodemon restarted!');
    });
}
// task for developer debug with the source code
gulp.task('dev', ['less', 'jshint'], function () {
  watchNodeJS();
  var browserSync = require('browser-sync').create();
  var reload = browserSync.reload;

  // Set proxy to your local url of node server
  browserSync.init({
    open: false,
    port: 8090,
    proxy: 'localhost:8080'
  });

  gulp.watch(['../web/styles/**/*.less'], ['less']);
  gulp.watch([
    '../web/assets/**/*.*',  
    '../web/i18n/**/*.*',  
    '../web/jshint/**/*.*',  
    '../web/scripts/**/*.js',  
    '../web/seo/**/*.*',  
    '../web/styles/**/*.css', 
    '../web/views/**/*.html'], reload);
});

// generate the dist folder
gulp.task('build', ['node-app', 'web', 'lib', 'others'], function () {});
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
