// # Globbing
// for performance reasons we're only matching one level down:      'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:        'test/spec/**/*.js'
'use strict';

var ngrok = require('ngrok');

module.exports = function (grunt) {


    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    ////Plugings (specified in package.json) are enabled inside the Gruntfile with a simple command
    //require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    //Project and task configuration 
    grunt.initConfig({

        yslow: {            pages: {                files: [{                    src: "http://localhost:8100/",                }],                options: {                    yslowOptions: {                        headers: ""   //(object) - an object where keys are the header names and values are the values of additional headers to add to the request                    },                    thresholds: {                        weight: 500, //The maximum page weight allowed (kb).                        speed: 5000, //The maximum load time of the page allowed (ms).                        score: 90,   //The minimum YSlow performance score (out of 100) required.                        requests: 15 //The maximum number of requests the page is allowed to send on load.                    }                }            }        },

        pagespeed: {
            //https://www.npmjs.com/package/grunt-pagespeed
            options: {
                nokey: true,
                locale: "en_GB",
                threshold: 10
            },
            mobile: {
                options: {
                    strategy: "mobile",
                    locale: "en_GB"
                }
            },
            paths: {
                options: {
                    paths: [
                        "/#/app/playlists",
                        "/#/app/search"
                    ],
                    locale: "en_GB",
                    strategy: "mobile",
                    threshold: 10
                }
            }
        },

        //Plugin: Detect errors and potential problems in JavaScript code 
        //and to enforce your team"s coding conventions.
        jshint: {
            options: {
                reporter: require('jshint-stylish'), // It shows the results in node.js window (needs to disable the output).
                //reporter: require('jshint-junit-reporter'),
                //reporterOutput: 'test_out/rules/jshint-checkstyle.xml',
                jshintrc: '.jshintrc',
                force: true
            },
            all: {
                src: ['Gruntfile.js',
                    '../../www/js/**/*.js']
            }
        },
       
        //Unit Test
        karma: {
            unit: {
                configFile: './config/karma.conf.js',
                autoWatch: false,
                singleRun: true,
                captureTimeout: 60000, //Browser not captured in 60000 ms, killing/restart.
                colors: true
            },
            //Autotest keep the test running and each time you save a file, the file is tested
            unit_auto: {
                configFile: './config/karma.conf.js',
                autoWatch: true,
                singleRun: false,
                autoWatchBatchDelay: 250, //tells Karma how long to wait after any changes have occurred before starting the test process again.
                captureTimeout: 60000,
                colors: true
            },
        },
        
        //e2e: Integration Test
        protractor: {
            options: {
                keepAlive: true,                            //If true, grunt process continues even if the test fails
                singleRun: false,
                configFile: './config/protractor.conf.js'   //Default config file.
            },
            run_chrome: { options: { args: { browser: 'chrome' } } },
            run_firefox: {options: {args: { browser: 'firefox'} } }
        }
    });


    
    //yslow
    grunt.registerTask('test:yslow', ['yslow']);

    //pagespeed
    grunt.registerTask('test:pagespeed', ['psi-ngrok']);
    grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function () {
        var done = this.async();
        var port = 8100;

        ngrok.connect(port, function (err, url) {
            if (err !== null) {
                grunt.fail.fatal(err);
                return done();
            }
            grunt.config.set('pagespeed.options.url', url);
            grunt.task.run('pagespeed');
            done();
        });
    });

    //Unit Test
    grunt.registerTask('test:unit', ['karma:unit']);            //autoWatch: false
    grunt.registerTask('test:unit_auto', ['karma:unit_auto']);   //autoWatch: true

    //Rules: Detect errors and potential problems in JavaScript code.
    grunt.registerTask('test:jshint', ['jshint:all']);
    
    //e2e (Integration Test)
    grunt.registerTask('test:e2e-chrome', ['protractor:run_chrome']);
    grunt.registerTask('test:e2e-firefox', ['protractor:run_firefox']);
    
    //Unit test & e2e & Coverage & Rules
    grunt.registerTask("test", ["test:unit", "test:jshint", "test:e2e-chrome"]);
    
};