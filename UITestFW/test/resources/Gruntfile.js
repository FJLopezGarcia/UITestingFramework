// # Globbing
// for performance reasons we're only matching one level down:      'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:        'test/spec/**/*.js'

module.exports = function (grunt) {
    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    ////Plugings (specified in package.json) are enabled inside the Gruntfile with a simple command
    //require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    //Project and task configuration 
    grunt.initConfig({
          
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