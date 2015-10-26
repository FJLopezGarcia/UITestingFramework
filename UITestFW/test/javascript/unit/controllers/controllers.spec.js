'use strict';

//Developers can Focus their tests - Run / Exclude a test in particular:
    // ddescribe & xdescribe
    // iit & xit

/* jasmine specs for controllers go here */
describe('Suite 1) Karma Unit Test with Jasemine - Example:', function(){

    it('spec 1 - It Should have the "hello" word..', inject(function() {
        var message = 'hello how are you';
        expect(message).toContain('hello');
    }));

    it('spec 2 - It Should have the "today" word..', inject(function () {
        var message = 'hello how are you today';		
    		expect(message).toContain('today');
    }));

    it('spec 3 - Should be green', function() {
        var color = 'green';
        debugger;
        //console.log(color); //is useful for finding data
        //alert(color)        //is only useful to block execution code 
        //dump(window);       //is the best for displaying data from a test > objects       
        expect(color).toBe('green');
    });

});

describe('Suite 2) AXE - Accessibility Engine plugin', function () {
    
    console.log('AXE - We are including Accessibility Engine plugin!!!');

    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend',
        '<div id="working">' +
            '<label for="has-label">Label for this text field.</label>' +
            '<input type="text" id="has-label">' +
        '</div>' +
        '<div id="broken">' +
            //'<label for="has-no-label">Label for this text field.</label>' +
            '<input type="text" id="has-no-label">' +
        '</div>');

    it('AXE - Accessibility Engine plugin: Should report that good HTML is good', function (done) {
        var n = document.getElementById('working');
        axe.a11yCheck(n, null, function (result) {
            expect(result.violations.length).toBe(0);
            done();
        });
    });

    it('AXE - Accessibility Engine plugin: Should report that bad HTML is bad', function (done) {
        var n = document.getElementById('broken');
        axe.a11yCheck(n, null, function (result) {
            // expect(result.violations.length).toBe(0);
            expect(result.violations.length).not.toBe(0);
            done();
        });
    });

});