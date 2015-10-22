var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var karma = require('karma').server;
var protractor = require("gulp-protractor").protractor;

var jshint = require('gulp-jshint');
var jshintXMLReporter = require('gulp-jshint-xml-file-reporter');


var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});



/* Run test once and exit */
gulp.task('test:unit', function (done) {
    karma.start({
        configFile: __dirname + '/config/karma.conf.js',
        autoWatch: false,
        singleRun: true,
        captureTimeout: 60000, //Browser not captured in 60000 ms, killing/restart.
        colors: true
    }, done);
});

/* Run test once and do not exit */
gulp.task('test:unit_auto', function (done) {
    karma.start({
        configFile: __dirname + '/config/karma.conf.js',
        autoWatch: true,
        singleRun: false,
        autoWatchBatchDelay: 250, //tells Karma how long to wait after any changes have occurred before starting the test process again.
        captureTimeout: 60000,
        colors: true
    }, done);
});

/* Plugin: Detect errors and potential problems in JavaScript code 
    and to enforce your team"s coding conventions.*/
gulp.task('test:jshint', function () {
    return gulp.src('../../www/js/**/*.js')
        //.pipe(jshint()) //Default
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))    //screen reporter
        .pipe(jshint.reporter(jshintXMLReporter))   //reporter to XML
            .on('end', jshintXMLReporter.writeFile({
                format: 'checkstyle',   // (checkstyle | jslint | junit) - defaults to checkstyle 
                filePath: __dirname + '/test_out/rules/jshint-checkstyle.xml',    // Path to write a file - defaults to jshint.xml 
                alwaysReport: true // Will write a report file even if there are no failing tests - defaults to false 
            }));
});

/*
1) Install standalone Selenium server - run npm install ("selenium-standalone": "~4.2.2"should be as dependency in "package.json" file)
    npm install selenium-standalone --save

2) Webdriver update
    node node_modules/protractor/bin/webdriver-manager update

3) Setup your "protractor.config.js" file

4) Then make sure the app is up and running:
    ionic server

5) Run Protractor
    protractor config/protractor.conf.js --suites suite1
    protractor debug config/protractor.conf.js --suites suite1
*/
gulp.task('test:e2e', function () {
    return gulp.src(['../test/javascript/e2e/*.js'])
        .pipe(protractor({
            configFile: __dirname + '/config/protractor.conf.js',
            args: ['--baseUrl', 'http://localhost:8100/'],
            debug: false
        }))
        .on('error', function (e) {
            throw e
        })
});