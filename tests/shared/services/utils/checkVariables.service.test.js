'use strict';

describe('Testing Check Variables Service', function() {

    var checkVariablesService;
    var productModel;

    beforeEach (function() {
        module ('aml');
        inject (function ($injector) {
            checkVariablesService = $injector.get ('checkVariablesService');
            productModel = $injector.get ('ProductModel');
        });
    });


    it('[checkVariable] Check array', function() {

        expect (function() { checkVariablesService.checkVariable ('string', ['array']); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable (12, ['array']); } ).toThrowError (TypeError);
        expect (checkVariablesService.checkVariable ([], ['array'])).toBeUndefined();

        expect (checkVariablesService.checkVariable ('string', ['!array'])).toBeUndefined();
        expect (checkVariablesService.checkVariable (12, ['!array'])).toBeUndefined();
        expect (function() { checkVariablesService.checkVariable ([], ['!array']); } ).toThrowError (TypeError);
    });


    it('[checkVariable] Check boolean', function() {

        expect (function() { checkVariablesService.checkVariable ('string', ['boolean']); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable (12, ['boolean']); } ).toThrowError (TypeError);
        expect (checkVariablesService.checkVariable (true, ['boolean'])).toBeUndefined();

        expect (checkVariablesService.checkVariable ('string', ['!boolean'])).toBeUndefined();
        expect (checkVariablesService.checkVariable (12, ['!boolean'])).toBeUndefined();
        expect (function() { checkVariablesService.checkVariable (false, ['!boolean']); } ).toThrowError (TypeError);
    });


    it('[checkVariable] Check function', function() {

        expect (function() { checkVariablesService.checkVariable ('string', ['function']); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable (12, ['function']); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable ([1,2], ['function']); } ).toThrowError (TypeError);
        expect (checkVariablesService.checkVariable (function() { return true; }, ['function'])).toBeUndefined();

        expect (checkVariablesService.checkVariable ('string', ['!function'])).toBeUndefined();
        expect (checkVariablesService.checkVariable (12, ['!function'])).toBeUndefined();
        expect (checkVariablesService.checkVariable ([1,2], ['!function'])).toBeUndefined();
        expect (function() { checkVariablesService.checkVariable (function() { return true; }, ['!function']); } ).toThrowError (TypeError);
    });


    it('[checkVariable] Check instanceof', function() {

        var product = new productModel;

        expect (function() { checkVariablesService.checkVariable ('string', ['instanceof ProductModel']); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable (12, ['instanceof ProductModel']); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable ([1,2], ['instanceof ProductModel']); } ).toThrowError (TypeError);
        expect (checkVariablesService.checkVariable (product, ['instanceof ProductModel'])).toBeUndefined();

        expect (checkVariablesService.checkVariable ('string', ['!instanceof ProductModel'])).toBeUndefined();
        expect (checkVariablesService.checkVariable (12, ['!instanceof ProductModel'])).toBeUndefined();
        expect (checkVariablesService.checkVariable ([1,2], ['!instanceof ProductModel'])).toBeUndefined();
        expect (function() { checkVariablesService.checkVariable (product, ['!instanceof ProductModel']); } ).toThrowError (TypeError);
    });


    it('[checkVariable] Check json', function() {

        expect (function() { checkVariablesService.checkVariable ('string', ['json']); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable ([1,2], ['json']); } ).toThrowError (TypeError);
        expect (checkVariablesService.checkVariable ('[{"name":"n1","price":1.2},{"name":"n2","price":4.6}]', ['json'])).toBeUndefined();

        expect (checkVariablesService.checkVariable ('string', ['!json'])).toBeUndefined();
        expect (checkVariablesService.checkVariable ([1,2], ['!json'])).toBeUndefined();
        expect (function() { checkVariablesService.checkVariable ('{"name":"n1","price":1.2}', ['!json']); } ).toThrowError (TypeError);
    });


    it('[checkVariable] Check null', function() {

        expect (function() { checkVariablesService.checkVariable ('string', ['null']); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable (12, ['null']); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable ([1,2], ['null']); } ).toThrowError (TypeError);
        expect (checkVariablesService.checkVariable (null, ['null'])).toBeUndefined();

        expect (checkVariablesService.checkVariable ('string', ['!null'])).toBeUndefined();
        expect (checkVariablesService.checkVariable (12, ['!null'])).toBeUndefined();
        expect (checkVariablesService.checkVariable ([1,2], ['!null'])).toBeUndefined();
        expect (function() { checkVariablesService.checkVariable (null, ['!null']); } ).toThrowError (TypeError);
    });


    it('[checkVariable] Check number', function() {

        expect (function() { checkVariablesService.checkVariable ('string', ['number']); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable (null, ['number']); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable ([1,2], ['number']); } ).toThrowError (TypeError);
        expect (checkVariablesService.checkVariable (12, ['number'])).toBeUndefined();

        expect (checkVariablesService.checkVariable ('string', ['!number'])).toBeUndefined();
        expect (checkVariablesService.checkVariable (null, ['!number'])).toBeUndefined();
        expect (checkVariablesService.checkVariable ([1,2], ['!number'])).toBeUndefined();
        expect (function() { checkVariablesService.checkVariable (12, ['!number']); } ).toThrowError (TypeError);
    });


    it('[checkVariable] Check object', function() {

        expect (function() { checkVariablesService.checkVariable ('string', ['object']); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable (null, ['object']); } ).toThrowError (TypeError);
        expect (checkVariablesService.checkVariable ([1,2], ['object'])).toBeUndefined();
        expect (checkVariablesService.checkVariable ({id: 12}, ['object'])).toBeUndefined();

        expect (checkVariablesService.checkVariable ('string', ['!object'])).toBeUndefined();
        expect (checkVariablesService.checkVariable (null, ['!object'])).toBeUndefined();
        expect (function() { checkVariablesService.checkVariable ([1,2], ['!object']); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable ({id: 12, name: 'name'}, ['!object']); } ).toThrowError (TypeError);
    });


    it('[checkVariable] Check string', function() {

        expect (function() { checkVariablesService.checkVariable (null, ['string']); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable (12, ['string']); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable ([1,2], ['string']); } ).toThrowError (TypeError);
        expect (checkVariablesService.checkVariable ('string', ['string'])).toBeUndefined();

        expect (checkVariablesService.checkVariable (null, ['!string'])).toBeUndefined();
        expect (checkVariablesService.checkVariable (12, ['!string'])).toBeUndefined();
        expect (checkVariablesService.checkVariable ([1,2], ['!string'])).toBeUndefined();
        expect (checkVariablesService.checkVariable ({id: 12}, ['!string'])).toBeUndefined();
        expect (function() { checkVariablesService.checkVariable ('string', ['!string']); } ).toThrowError (TypeError);
    });


    it('[checkVariable] Check undefined', function() {

        var undefinedVar;

        expect (function() { checkVariablesService.checkVariable (null, ['undefined']); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable (12, ['undefined']); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable ([1,2], ['undefined']); } ).toThrowError (TypeError);
        expect (checkVariablesService.checkVariable (undefinedVar, ['undefined'])).toBeUndefined();

        expect (checkVariablesService.checkVariable (null, ['!undefined'])).toBeUndefined();
        expect (checkVariablesService.checkVariable (12, ['!undefined'])).toBeUndefined();
        expect (checkVariablesService.checkVariable ([1,2], ['!undefined'])).toBeUndefined();
        expect (checkVariablesService.checkVariable ({id: 12}, ['!undefined'])).toBeUndefined();
        expect (function() { checkVariablesService.checkVariable (undefinedVar, ['!undefined']); } ).toThrowError (TypeError);
    });


    it('[checkVariable] Check with variableToCompare', function() {

        var intVar = 11;
        var strVar = 'test';
        var boolVar = true;

        // ==
        expect (checkVariablesService.checkVariable (intVar, ['=='], '', intVar)).toBeUndefined();
        expect (checkVariablesService.checkVariable (intVar, ['=='], '', intVar.toString())).toBeUndefined();
        expect (checkVariablesService.checkVariable (strVar, ['=='], '', strVar)).toBeUndefined();
        expect (checkVariablesService.checkVariable (boolVar, ['=='], '', boolVar)).toBeUndefined();

        expect (function() { checkVariablesService.checkVariable (intVar, ['=='], '', strVar); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable (intVar, ['=='], '', boolVar); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable (strVar, ['=='], '', boolVar); } ).toThrowError (TypeError);

        // !=
        expect (checkVariablesService.checkVariable (intVar, ['!='], '', strVar)).toBeUndefined();
        expect (checkVariablesService.checkVariable (intVar, ['!='], '', boolVar)).toBeUndefined();
        expect (checkVariablesService.checkVariable (strVar, ['!='], '', boolVar)).toBeUndefined();

        expect (function() { checkVariablesService.checkVariable (intVar, ['!='], '', intVar); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable (intVar, ['!='], '', intVar.toString()); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable (strVar, ['!='], '', strVar); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable (boolVar, ['!='], '', boolVar); } ).toThrowError (TypeError);

        // ===
        expect (checkVariablesService.checkVariable (intVar, ['==='], '', intVar)).toBeUndefined();
        expect (checkVariablesService.checkVariable (strVar, ['==='], '', strVar)).toBeUndefined();
        expect (checkVariablesService.checkVariable (boolVar, ['==='], '', boolVar)).toBeUndefined();

        expect (function() { checkVariablesService.checkVariable (intVar, ['==='], '', strVar); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable (intVar, ['==='], '', intVar.toString()); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable (intVar, ['==='], '', boolVar); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable (strVar, ['==='], '', boolVar); } ).toThrowError (TypeError);

        // !==
        expect (checkVariablesService.checkVariable (intVar, ['!=='], '', strVar)).toBeUndefined();
        expect (checkVariablesService.checkVariable (intVar, ['!=='], '', boolVar)).toBeUndefined();
        expect (checkVariablesService.checkVariable (strVar, ['!=='], '', boolVar)).toBeUndefined();

        expect (function() { checkVariablesService.checkVariable (intVar, ['!=='], '', intVar); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable (strVar, ['!=='], '', strVar); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable (boolVar, ['!=='], '', boolVar); } ).toThrowError (TypeError);
    });


    it('[checkVariable] Check containedAsValue', function() {

        var allowedValues = {ERROR: 'ErrorValue', INFO: 'InfoValue'};

        expect (checkVariablesService.checkVariable (allowedValues.ERROR, ['containedAsValue'], '', allowedValues)).toBeUndefined();
        expect (checkVariablesService.checkVariable (allowedValues.INFO, ['containedAsValue'], '', allowedValues)).toBeUndefined();

        expect (function() { checkVariablesService.checkVariable (12, ['containedAsValue'], '', allowedValues); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable ('testStr', ['containedAsValue'], '', allowedValues); } ).toThrowError (TypeError);

        expect (function() { checkVariablesService.checkVariable (allowedValues.ERROR, ['!containedAsValue'], '', allowedValues); } ).toThrowError (TypeError);
        expect (function() { checkVariablesService.checkVariable (allowedValues.INFO, ['!containedAsValue'], '', allowedValues); } ).toThrowError (TypeError);

        expect (checkVariablesService.checkVariable (12, ['!containedAsValue'], '', allowedValues)).toBeUndefined();
        expect (checkVariablesService.checkVariable ('testStr', ['!containedAsValue'], '', allowedValues)).toBeUndefined();
    });

});