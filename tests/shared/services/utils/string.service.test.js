'use strict';

describe('Testing String Service', function() {

    var stringService;

    beforeEach (function() {
        module ('aml');
        inject (function ($injector) {
            stringService = $injector.get ('stringService');
        });
    });


    it('[isJSON] Not valid Json strings', function() {

        expect (stringService.isJSON ('')).toBeFalsy();
        expect (stringService.isJSON ('AbC')).toBeFalsy();
        expect (stringService.isJSON ('{"a","1"}')).toBeFalsy();
    });


    it('[isJSON] Valid Json strings', function() {

        expect (stringService.isJSON ('{}')).toBeTruthy();
        expect (stringService.isJSON ('{"id":1,"acreg":"D-AHI"}')).toBeTruthy();
        expect (stringService.isJSON ('[{}]')).toBeTruthy();
        expect (stringService.isJSON ('[{"name":"n1","price":1.2},{"name":"n2","price":4.6}]')).toBeTruthy();
    });


    it('[leftTrimOfString] srcString without changes', function() {

        expect (stringService.leftTrimOfString (null, '')).toBeNull();
        expect (stringService.leftTrimOfString ('originalStr', '')).toBe ('originalStr');
        expect (stringService.leftTrimOfString ('originalStr', 'final')).toBe ('originalStr');
    });


    it('[leftTrimOfString] srcString with changes', function() {

        expect (stringService.leftTrimOfString ('originalStr', 'ori')).toBe ('ginalStr');
        expect (stringService.leftTrimOfString ('originalStr', 'originalStr')).toBe ('');
    });

});