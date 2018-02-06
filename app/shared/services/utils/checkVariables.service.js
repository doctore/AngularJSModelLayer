/**
 * Helper functions used to check the content and/or type of Javascript variables
 */
(function () {
    'use strict';

    angular.module ('aml')
           .factory ('checkVariablesService', checkVariablesService);

    // Injections for this service
    checkVariablesService.$inject = ['stringService'];

    /*
     * Constructor for this service
     */
    function checkVariablesService (stringService) {

        // Log Tag
        var TAG = 'checkVariablesService';

        //Public API
        return {
            checkVariable : checkVariable
        };


        /**
         *    Checks if the given variable satisfies the rules passed as parameter. This function checks the
         * following rules:
         *
         *  1. Rules that check only the given variable:
         *
         *     - 'array': error is generated if the given variable is not an array
         *     - 'boolean': error is generated if the given variable is not boolean
         *     - 'function': error is generated if the given variable is not a function
         *     - 'instanceof {Class Name}': error is generated if the given variable is not an instance of {Class Name}
         *     - 'json': error is generated if the given variable is not a well-formed JSON string
         *     - 'null': error is generated if the given variable is not null
         *     - 'number': error is generated if the given variable is not number
         *     - 'object': error is generated if the given variable is not an object
         *     - 'string': error is generated if the given variable is not string
         *     - 'undefined': error is generated if the given variable is not undefined
         *
         *     All the above rules permit the following flags as prefix:
         *
         *     - '!': the meaning of the rule becomes to the contrary. For example:
         *              'array'  => the given variable must be an array
         *              '!array' => the given variable must not be an array
         *
         *  2. Rules that check given variable against the given variableToCompare:
         *
         *     - '==': error is generated if the given variable is not == to variableToCompare
         *     - '!=': error is generated if the given variable is not != to variableToCompare
         *     - '===': error is generated if the given variable is not === to variableToCompare
         *     - '!==': error is generated if the given variable is not !== to variableToCompare
         *
         *  3. Rules that search given variable value against the given variableToCompare:
         *
         *     - 'containedAsValue': error is generated if the given variable does not exists as value in variableToCompare.
         *                           This rule permits the flag ! too.
         *
         * @param {*} variable
         *    Variable to check
         * @param {Array} rulesToCheck
         *    Rules to check
         * @param {string} prefixForErrorMessage
         *    String with the "title" of error message
         * @param {*} variableToCompare
         *    Object used to compared the given variable if we want to check certain rules (see 2. and 3.)
         *
         * @return {TypeError} if the given variable fails any rule
         *
         * @throws TypeError
         */
        function checkVariable (variable, rulesToCheck, prefixForErrorMessage, variableToCompare) {

            if (!angular.isArray (rulesToCheck))
                rulesToCheck = [rulesToCheck];

            if (typeof prefixForErrorMessage === 'undefined' || prefixForErrorMessage == null)
                prefixForErrorMessage = '';

            var errorMessage = '';
            for (var i = 0; i < rulesToCheck.length; i++) {

                var rootRule, notFlag;
                if (rulesToCheck[i] === '!=' || rulesToCheck[i] === '!==') {
                    rootRule = rulesToCheck[i];
                    notFlag  = false;
                }
                else {
                    rootRule = _.trimStart (rulesToCheck[i], '!');
                    notFlag  = _.startsWith (rulesToCheck[i], '!');
                }

                // The list of rules that this function checks
                switch (rootRule) {

                    case 'array':
                        if (notFlag)
                            errorMessage += (_.isArray (variable) ? ' [is an array] ' : '');
                        else
                            errorMessage += (!_.isArray (variable) ? ' [is not an array] ' : '');
                    break;

                    case 'boolean':
                        if (notFlag)
                            errorMessage += (_.isBoolean (variable) ? ' [is boolean] ' : '');
                        else
                            errorMessage += (!_.isBoolean (variable) ? ' [is not boolean] ' : '');
                    break;

                    case 'function':
                        if (notFlag)
                            errorMessage += (_.isFunction (variable) ? ' [is a function] ' : '');
                        else
                            errorMessage += (!_.isFunction (variable) ? ' [is not a function] ' : '');
                    break;

                    case 'json':
                        if (notFlag)
                            errorMessage += (stringService.isJSON (variable) ? ' [is a well-formed JSON string] ' : '');
                        else
                            errorMessage += (!stringService.isJSON (variable) ? ' [is not a well-formed JSON string] ' : '');
                    break;

                    case 'null':
                        if (notFlag)
                            errorMessage += (_.isNull (variable) ? ' [is null] ' : '');
                        else
                            errorMessage += (!_.isNull (variable) ? ' [is not null] ' : '');
                    break;

                    case 'number':
                        if (notFlag)
                            errorMessage += (_.isNumber (variable) ? ' [is number] ' : '');
                        else
                            errorMessage += (!_.isNumber (variable) ? ' [is not number] ' : '');
                    break;

                    case 'object':
                        if (notFlag)
                            errorMessage += (_.isObject (variable) ? ' [is an object] ' : '');
                        else
                            errorMessage += (!_.isObject (variable) ? ' [is not an object] ' : '');
                    break;

                    case 'string':
                        if (notFlag)
                            errorMessage += (_.isString (variable) ? ' [is a string] ' : '');
                        else
                            errorMessage += (!_.isString (variable) ? ' [is not a string] ' : '');
                    break;

                    case 'undefined':
                        if (notFlag)
                            errorMessage += (_.isUndefined (variable) ? ' [is undefined] ' : '');
                        else
                            errorMessage += (!_.isUndefined (variable) ? ' [is not undefined] ' : '');
                    break;

                    case '==':
                        errorMessage += (variable != variableToCompare ? ' [is not == to the given variable to compare] ' : '');
                    break;

                    case '!=':
                        errorMessage += (variable == variableToCompare ? ' [is not != to the given variable to compare] ' : '');
                    break;

                    case '===':
                        errorMessage += (variable !== variableToCompare ? ' [is not === to the given variable to compare] ' : '');
                    break;

                    case '!==':
                        errorMessage += (variable === variableToCompare ? ' [is not !== to the given variable to compare] ' : '');
                    break;

                    case 'containedAsValue':

                        if (typeof variableToCompare === 'undefined' || variableToCompare == null)
                            errorMessage += ' [a valid variableToCompare is needed] ';
                        else if (typeof variableToCompare !== 'object')
                            errorMessage += ' [variableToCompare is not an object] ';
                        else {
                            var foundFlag = false;

                            // Searches variable as value inside variableToCompare
                            for (var prop in variableToCompare) {
                                if (variableToCompare.hasOwnProperty (prop) && variableToCompare[prop] === variable) {
                                    foundFlag = true;
                                    break;
                                }
                            }
                            if (notFlag)
                                errorMessage += (foundFlag ? ' [is contained as value in the given variable to compare] ' : '');
                            else
                                errorMessage += (!foundFlag ? ' [is not contained as value in the given variable to compare] ' : '');
                        }
                    break;

                    default:
                        // Check the constructor name of the given variable
                        if (_.startsWith (rootRule, 'instanceof')) {
                            var constructorName = stringService.leftTrimOfString (rootRule, 'instanceof');

                            if (notFlag) {
                                if (typeof variable !== 'undefined' && typeof variable.constructor !== 'undefined' &&
                                       variable.constructor.name == constructorName)
                                    errorMessage += ' [is an object of type ' + constructorName + '] ';
                            }
                            else if (typeof variable === 'undefined' || typeof variable.constructor === 'undefined' ||
                                        variable.constructor.name != constructorName)
                                errorMessage += ' [is not an object of type ' + constructorName + '] ';
                        }
                    break;
                }
            }
            if (errorMessage.length != 0)
                throw new TypeError (prefixForErrorMessage + ': ' + variable + '. ' + errorMessage);
        }

    }

})();
