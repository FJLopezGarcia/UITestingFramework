
var AxeBuilder = require('../../resources/node_modules/axe-webdriverjs');

'use strict';

describe('E2E Test - Home:', function(){

    browser.driver.get(browser.baseUrl); // navigate into the home page

    browser.sleep(3000);

    //it('00) AXE - Accessibility Engine plugin - Should be accessible', function () {
    //    AxeBuilder(browser.driver)
    //        .analyze(function (results) {
    //            console.log(results.violations)
    //            expect(results.violations.length).toBe(0);
    //        });
    //});

    it('01) - Title', function () {
        expect(browser.driver.getTitle()).toEqual('Playlists');
    });

    it('02) Playlists Items', function () {
        browser.driver.findElements(by.css('[nav-view="active"] ion-list ion-item[ng-repeat="playlist in playlists"]')).then(function (elements) {

            var length = elements.length; // Here's your length!
            console.log ('elements: ' + length);

            elements[0].findElement(by.css("a")).getText().then(function (text) {
                expect(text).toEqual('Reggae');
            });
            
            elements[1].findElement(by.css("a")).getText().then(function (text) {
                expect(text).toEqual('Chill');
            });

            elements[2].findElement(by.css("a")).getText().then(function (text) {
                expect(text).toEqual('Dubstep');
            });

            elements[3].findElement(by.css("a")).getText().then(function (text) {
                expect(text).toEqual('Indie');
            });

            elements[4].findElement(by.css("a")).getText().then(function (text) {
                expect(text).toEqual('Rap');
            });

            elements[5].findElement(by.css("a")).getText().then(function (text) {
                expect(text).toEqual('Cowbell');
            });

        });
    });

});