/*
1) Install standalone Selenium server run 
    npm install --> ("selenium-standalone" should be present as  dependency in "package.json")
    Or you can install manually --> npm install selenium-standalone --save

2) Webdriver update
    node node_modules/protractor/bin/webdriver-manager update

3) Setup your "protractor.config.js" file

4) Then make sure the app is up and running:
    ionic server

5) Run Protractor
    protractor config/protractor.conf.js --suites suite1
    protractor debug config/protractor.conf.js --suites suite1
*/

var HtmlReporter = require('protractor-html-screenshot-reporter');

var today = new Date(),
    timeStamp = today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear() + '-' + today.getHours() + 'h-' + today.getMinutes() + 'm';

var reporter = new HtmlReporter({
    //baseDirectory: 'test/resources/test_out/e2e', // gulp - a location to store screen shots.
    baseDirectory: 'test_out/e2e',                  // grunt - a location to store screen shots.
    docTitle: 'Protractor Reporter',
    docName: 'protractor-tests-report-' + timeStamp + '.html',
    takeScreenShotsOnlyForFailedSpecs: false
});

exports.config = {

  allScriptsTimeout: 15000,
  
    // The port to start the selenium server on, or null if the server should
    // find its own unused port.
  seleniumPort: 4444,
  
    // Capabilities to be passed to the webdriver instance.
  capabilities: {
      'browserName': 'chrome',
      chromeOptions: {
        args: ['--disable-extensions']
      }      
  },

    // Run Protractor Against Internet Explorer: 
    // ttp://elgalu.github.io/2014/run-protractor-against-internet-explorer-vm/
    // Make protractor download selenium and IE Driver for you:             webdriver-manager update --ie
    // Start selenium on a custom port, the one we preferred before: 4411:  webdriver-manager start --seleniumPort=4411
    // Capabilities to be passed to the webdriver instance.
    // capabilities: {
    //      'browserName': 'internet explorer',
    //      'platform': 'ANY',
    //      'version': '11'
    //},

    //multiCapabilities: [
    //    {'browserName': 'firefox'}, 
    //    {'browserName': 'chrome'},
    //    {'browserName': 'safari'}
    //],

  //A base URL for your application under test.
  //Calls to protractor.get() with relative paths will be prepended with this.
  baseUrl: 'http://localhost:8100/',
  
  //framework: 'jasmine',
  framework: 'jasmine',

    //An array of file patterns that point to your spec files.
    //Patterns are relative to the current working directory when Protractor is started up.
  specs: [
    '../../../test/javascript/e2e/**/home.spec.js',
  ],
    // Patterns to exclude.
  exclude: [
  ],

    //Separate your tests in various test suites: protractor protractor.conf.js --suite homepage
  suites: {
      home: '../../../test/javascript/e2e/**/home.spec.js',
      full: '../../../test/javascript/e2e/**/*.spec/*.js'
  },

  onPrepare: function () {

      //Set window size before starting the tests
      browser.driver.manage().window().setSize(414, 736); //Apple iPhone 6 Plus (portrait)
      //browser.driver.get('http://localhost:8100');

      //Reporter: with protractor-html-screenshot-reporter
      jasmine.getEnv().addReporter(reporter);
  },

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        onComplete: null,                   //function to call before the driver quits
        showColors: true,                   //provide colored output during spec runs
        defaultTimeoutInterval: 30000,      //Function called to print jasmine results.
        isVerbose: true,                    //provide verbose output during spec runs
        includeStackTrace: true             //include a stack trace on errors
    },

    // *****************************************/
    //          browser.debugger();
    // *****************************************/
    //When debugger() is called, it also inserts all the client side scripts
    //from Protractor into the browser as `window.clientSideScripts`. They can be
    //used from the browser's console.
    //Console:
    // > window.clientSideScripts.findInputs('username');
    // Should return the input element with model 'username'.

    //press c to continue to the next webdriver command
    //press d to continue to the next debugger statement
    //press ^C to exit
};