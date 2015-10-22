/*
1 - Install Karma globally (-g):
    npm install -g karma

2 - Install karma command lines globally (-g):
    npm install -g karma-cli

3 - Install locally the dependencies present in the “package.json” file
    npm install 

4 - Install the libs present in “bower.json“ --> angular-mocks.js
    Bower install

5 - Setup your “karma.config.js” file

6.1 - Run Karma from Node Command line
  karma start tests/karma.config.js

6.2 - Run Karma with GRUNT
  grunt tests:unit
*/

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../../../www/',
        //urlRoot: '/',

        // web server port
        port: 9876,

        //Level of logging - Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        //logLevel: config.LOG_DEBUG,

        //The files array is a listing of files necessary for running your unit tests. 
        files: [

            // JSON fixture - moking data from JSON
            //{pattern: 'data/**/*.json', watched: true, served: true, included: false},
    
            'lib/angular/angular.js',
            'lib/angular-animate/angular-animate.js',
            'lib/angular-mocks/angular-mocks.js', //Is a very useful test helper that angular provides (testing extensions). Contains mocking tools to easily test AngularJS modules
            'lib/angular-sanitize/angular-sanitize.js',
            //'release/angular-ui-router.js',                                    
            
            'lib/ionic/js/ionic.bundle.js',
            'lib/ionic/js/ionic.js',
            'lib/ionic/js/ionic-angular.js',
            'lib/ionic/js/angular-ui/angular-ui-router.js',

            //AXE - Accessibility Engine plugin:
            'lib/axe-core/axe.min.js',

            // ** JS to test
            'js/app.js',
            'js/controllers.js',

            // ** Unit tests: My Spec files **
            '../test/javascript/unit/controllers/*.spec.js',
            '../test/javascript/unit/directives/*.spec.js',
            '../test/javascript/unit/services/*.spec.js'
        ],

        exclude: [
        ],

        //enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        //Description: Continuous Integration mode. 
        //If "true", Karma will start and capture all configured browsers, run tests and then exit with an exit code of 0 or 1 depending on whether all tests passed or any tests failed.
        singleRun: true,

        //Enable or disable colors in the output (reporters and logs).
        colors: true,

        //autoWatchBatchDelay: When Karma is watching the files for changes, it tries to batch multiple changes into a single run so that the test runner doesn't 
        //try to start and restart running tests more than it should. The configuration setting tells Karma how long to wait (in milliseconds) after any 
        //changes have occurred before starting the test process again.
        autoWatchBatchDelay: 250,

        //The captureTimeout value represents the maximum boot-up time allowed for a browser to start and connect to Karma. 
        //If any browser does not get captured within the timeout, Karma will kill it and try to launch it again and, after three attempts to capture it, Karma will give up.
        captureTimeout: 60000,

        frameworks: ['jasmine'],

        //browsers: ['IE', 'Chrome', 'Firefox', 'Safari'],
        browsers: ['Chrome'],

        //You can run IE in emulation mode by setting the 'x-ua-compatible' option:
        //browsers: ['IE_8','IE_9','IE_10'],
        customLaunchers: {
            'IE_8': {
                base: 'IE',
                'x-ua-compatible': 'IE=EmulateIE8'
            },
            'IE_9': {
                base: 'IE',
                'x-ua-compatible': 'IE=EmulateIE9'
            },
            'IE_10': {
                base: 'IE',
                'x-ua-compatible': 'IE=EmulateIE10'
            }
        },

        plugins: [
            'karma-coverage',
            "karma-html2js-preprocessor",
            'karma-junit-reporter',
            'karma-htmlfile-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-Safari-launcher',
            'karma-IE-launcher',
            //'karma-opera-launcher',
            'karma-jasmine'
        ],

        //*********************************************************************
        // Reporters
        //*********************************************************************
        //To activate the XML reporter add:         ['progress', 'junit']
        //To activate the Coverage reporter add:    ['progress', 'coverage']
        //To activate the html reporter add:        ['progress', 'html']
        
        //reporters: ['progress', 'junit', 'coverage', 'html'],
        reporters: ['progress', 'coverage', 'html'],
        // junitReporter: {
        //     outputFile: '../test/resources/test_out/unit/Unit_Test-results.xml',
        //      suite: 'unit'
        // },
        htmlReporter: {
            outputFile: '../test/resources/test_out/unit/Unit_Test-results.html'
        },

        //*********************************************************************
        // COVERAGE:
        //*********************************************************************
        preprocessors: {
            // Source files, that you wanna generate coverage for
            // Do not include tests or libraries
            
            //How to Exlude:
            //'app/js/!(directives|Filters)/!(base.controller*|pa.development.plan.controller*|pa.development.plan.service*|pa.methods.service*|pa.spinner.service*).js': ['coverage'],
            'js/**/*.js': ['coverage']
        },

        // You can use multiple reporters, by providing array of options.
        //If no filename is given, it will write the output to the console. https://github.com/karma-runner/karma-coverage
        //
        //Coverage threshold colors (watermarks): 
        //- The first number is the threshold between Red and Yellow. 
        //- The second number is the threshold between Yellow and Green.
        coverageReporter: {
            reporters: [
              {
                  type: 'html',
                  dir: '../test/resources/test_out/coverage/',
                  watermarks: {
                      //        [R/Y , Y/G]
                      statements: [50,75],
                      lines: [50,75],
                      functions: [50,75],
                      branches: [50, 75]
                  }
              },
              //{ type: 'text-summary' , dir: '../test/resources/test_out/coverage/'},
              {
                  type: 'text',
                  dir: '../test/resources/test_out/coverage/',
                  watermarks: {
                      //        [R/Y , Y/G]
                      statements: [50,75],
                      lines: [50,75],
                      functions: [50,75],
                      branches: [50, 75]
                  }
              }
            ],
        }
    });
};