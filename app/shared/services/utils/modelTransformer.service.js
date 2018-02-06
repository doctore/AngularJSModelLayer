/**
 * Helper functions used to transform a JSON string or array to a Javascript object and vice versa
 */
(function () {
    'use strict';

    angular.module ('aml')
           .factory ('modelTransformerService', modelTransformerService);

    // Injections for this service
    modelTransformerService.$inject = ['$injector', 'checkVariablesService'];

    /*
     * Constructor for this service
     */
    function modelTransformerService ($injector, checkVariablesService) {

        // Log Tag
        var TAG = 'modelTransformerService';

        //Public API
        return {
            fromArrayToModel : fromArrayToModel,
            fromJsonArrayToModel : fromJsonArrayToModel,
            fromJsonToModel : fromJsonToModel,
            fromModelArrayToJson : fromModelArrayToJson,
            fromModelObjectToJson : fromModelObjectToJson,
            fromObjectToModel : fromObjectToModel
        };


        /**
         * Transforms the given array to a Javascript object whose constructor is given as parameter too
         *
         * @example
         *    var transportClasses = modelTransformerService.fromArrayToModel ([{'id':1,'name':'prod1','price':11.2,'createDate':'11-01-2018 12:34:57'}
         *                                                                     ,{'id':2,'name':'prod2','price':9.3,'createDate':'12-01-2018 13:45:01'}]
         *                                                                    ,ProductModel);
         * @param {Array} array
         *    Values to convert to the required object
         * @param {Function} modelConstructor
         *    Constructor used to generate the required objects
         *
         * @returns {Array} array of Javascript objects (or a single object if array parameter is not a vector)
         *
         * @throws TypeError
         */
        function fromArrayToModel (array, modelConstructor) {

            // Title of the log/error messages
            var logTitle = TAG + '.fromArrayToModel:';

            checkVariablesService.checkVariable (array, ['!null', '!undefined'], logTitle + ' array');
            checkVariablesService.checkVariable (modelConstructor, ['function', '!null', '!undefined'], logTitle + ' modelConstructor');

            if (angular.isArray (array)) {
                var models = [];

                for (var i = 0; i < array.length; i++)
                    models.push (fromObjectToModel (array[i], modelConstructor));

                return models;
            }
            // It is not an array
            else
                return fromObjectToModel (array, modelConstructor);
        }


        /**
         *    Transforms the given array of well-formed JSON string to a Javascript object whose
         * constructor is given as parameter too.
         *
         * @example
         *    var transportClasses = modelTransformerService.fromJsonArrayToModel (
         *                                    ['{"id":1,"name":"prod1","price":11.2,"createDate":"11-01-2018 12:34:57"}'
         *                                    ,'{"id":2,"name":"prod2","price":9.3,"createDate":"12-01-2018 13:45:01"}']
         *                                   ,ProductModel);
         * @param {Array} arrayJsonString
         *    Vector of well-formed JSON strings
         * @param {Function} modelConstructor
         *    Constructor used to generate the required objects
         *
         * @return {Array} array of Javascript objects (or a single object if arrayJsonString parameter is not a vector)
         */
        function fromJsonArrayToModel (arrayJsonString, modelConstructor) {

            // Title of the log/error messages
            var logTitle = TAG + '.fromJsonArrayToModel:';

            checkVariablesService.checkVariable (arrayJsonString, ['!null', '!undefined'], logTitle + ' arrayJsonString');
            checkVariablesService.checkVariable (modelConstructor, ['function', '!null', '!undefined'], logTitle + ' modelConstructor');

            if (angular.isArray (arrayJsonString)) {
                var models = [];

                for (var i = 0; i < arrayJsonString.length; i++)
                    models.push (fromJsonToModel (arrayJsonString[i], modelConstructor));

                return models;
            }
            // It is not an array
            else
                return fromJsonToModel (arrayJsonString, modelConstructor);
        }


        /**
         * Transforms the given well-formed JSON string to a Javascript object whose constructor is given as parameter too
         *
         * @example
         *    var transportClasses = modelTransformerService.fromJsonToModel ('{"id":1,"name":"prod1","price":11.2,"createDate":"11-01-2018 12:34:57"}'
         *                                                                   ,ProductModel);
         * @param (string) jsonString
         *    JSON string to convert to the required object
         * @param {Function} modelConstructor
         *    Constructor used to generate the required objects
         *
         * @returns {Array} array of Javascript objects (or a single object if jsonString parameter is not a vector)
         *
         * @throws TypeError
         */
        function fromJsonToModel (jsonString, modelConstructor) {

            // Title of the log/error messages
            var logTitle = TAG + '.fromJsonToModel:';

            checkVariablesService.checkVariable (jsonString, ['json', '!null', 'string', '!undefined'], logTitle + ' jsonString');
            checkVariablesService.checkVariable (modelConstructor, ['function', '!null', '!undefined'], logTitle + ' modelConstructor');

            // Transform the given string to an object
            jsonString = JSON.parse(jsonString);

            if (angular.isArray (jsonString))
                return fromArrayToModel (jsonString, modelConstructor);

            // Exists only one object to generate
            else
                return fromObjectToModel (jsonString, modelConstructor);
        }


        /**
         *    Transforms the given array of "model objects" in a well-formed JSON string. If the given
         * objects have properties defined as models, the process also transforms this properties recursively.
         *
         * @param {Array} modelArray
         *    Vector of objects belonging to a specific model
         * @param {boolean} convertAllPropertiesDefinedInModel
         *    If true (or undefined) => transforms all properties.
         *    If false => excludes the properties returned by the function getPropertiesExcludedOfJsonConversion
         *    defined in the model definition.
         *
         * @returns well-formed JSON string
         *
         * @throws TypeError
         */
        function fromModelArrayToJson (modelArray, convertAllPropertiesDefinedInModel) {

            // Title of the log/error messages
            var logTitle = TAG + '.fromModelArrayToJson:';

            checkVariablesService.checkVariable (modelArray, ['!null', '!undefined'], logTitle + ' modelArray');

            if (typeof convertAllPropertiesDefinedInModel === 'undefined' || convertAllPropertiesDefinedInModel == null)
                convertAllPropertiesDefinedInModel = true;

            if (angular.isArray (modelArray)) {

                var models = [];
                for (var i = 0; i < modelArray.length; i++)
                    models.push (getRealObjectToConvertToJson (modelArray[i], convertAllPropertiesDefinedInModel));

                return JSON.stringify (models);
            }
            // modelArray is a single object
            else
                return fromModelObjectToJson (modelArray, convertAllPropertiesDefinedInModel);
        }


        /**
         *    Transforms the given "model object" in a well-formed JSON string. If the given object
         * has properties defined as models, the process also transforms this properties recursively.
         *
         * @example
         *    var jsonString = modelTransformerService.fromModelObjectToJson (productModelObject, true);
         *
         * @param {Object} modelObject
         *    Object to convert to JSON string
         * @param {boolean} convertAllPropertiesDefinedInModel
         *    If true (or undefined) => transforms all properties.
         *    If false => excludes the properties returned by the function getPropertiesExcludedOfJsonConversion
         *    defined in the model definition./home/apocalypsis/workspace/angularjs.model.layer
         *
         * @returns well-formed JSON string
         *
         * @throws TypeError
         */
        function fromModelObjectToJson (modelObject, convertAllPropertiesDefinedInModel) {

            // Title of the log/error messages
            var logTitle = TAG + '.fromModelObjectToJson:';

            checkVariablesService.checkVariable (modelObject, ['!null', '!undefined', '!array'], logTitle + ' modelObject');

            if (typeof convertAllPropertiesDefinedInModel === 'undefined' || convertAllPropertiesDefinedInModel == null)
                convertAllPropertiesDefinedInModel = true;

            return JSON.stringify (getRealObjectToConvertToJson (modelObject, convertAllPropertiesDefinedInModel));
        }


        /**
         *    Transforms the given object to another Javascript object whose constructor is given as parameter too.
         * All properties with the same name in both objects will be copied from "object parameter" to "new object".
         *
         *    If the modelConstructor definition has properties that need another modelConstructor to create this
         * properties, the current function searches the method getPropertiesWithModelConstructor to resolve those
         * dependencies.
         *
         * @param {Object} object
         *    Object to convert
         * @param {Function} modelConstructor
         *    Constructor used to generate the required object
         * @param {boolean} forceDeepCopyOfPropertiesWithModelConstructor
         *    If true/null/undefined => recursively descends into object properties of source objects, performing
         *    a deep copy of properties that have defined with a model constructor.
         *
         * @returns {Object} new object using modelConstructor as constructor
         *
         * @throws TypeError
         */
        function fromObjectToModel (object, modelConstructor, forceDeepCopyOfPropertiesWithModelConstructor) {

            // Title of the log/error messages
            var logTitle = TAG + '.fromObjectToModel:';

            checkVariablesService.checkVariable (object, ['!null', '!undefined', '!array'], logTitle + ' object');
            checkVariablesService.checkVariable (modelConstructor, ['function', '!null', '!undefined'], logTitle + ' modelConstructor');

            if (typeof forceDeepCopyOfPropertiesWithModelConstructor === 'undefined' || forceDeepCopyOfPropertiesWithModelConstructor == null)
                forceDeepCopyOfPropertiesWithModelConstructor = true;

            // Gets the array of properties that need a model constructor
            var propertiesWithModelConstructor = [];
            if (angular.isFunction (modelConstructor.getPropertiesWithModelConstructor))
                propertiesWithModelConstructor = modelConstructor.getPropertiesWithModelConstructor();

            var model = new modelConstructor();

            // Update the values of properties with the same name
            for (var prop in model) {
                if (model.hasOwnProperty (prop) && object.hasOwnProperty (prop)) {

                    // If the current property needs to be created using a model constructor
                    if (propertiesWithModelConstructor[prop]) {

                        // If we want a deep copy of properties
                        if (forceDeepCopyOfPropertiesWithModelConstructor) {

                            // Inject the necessary model constructor dynamically
                            var propertyWithModel = $injector.get(propertiesWithModelConstructor[prop]);
                            if (angular.isArray (object[prop])) {

                                model[prop] = [];
                                for (var i = 0; i < object[prop].length; i++)
                                    model[prop].push (fromObjectToModel (object[prop][i], propertyWithModel));
                            }
                            // The property is not an array
                            else
                                model[prop] = (object == null || object[prop] == null) ? null : fromObjectToModel (object[prop], propertyWithModel);
                        }
                    }
                    // The current property does not need to be created using a model constructor
                    else
                        model[prop] = (object == null) ? null : object[prop];
                }
            }
            return model;
        }


        /**
         *    Generates a new object with the properties that we want to save in the "future JSON string". If
         * the given object has properties defined as models, the process also transforms this properties recursively.
         *
         *    If the modelConstructor definition of the given modelObject has properties that need another modelConstructor
         * to create this properties, the current function searches the method getPropertiesWithModelConstructor to resolve
         * those dependencies.
         *
         * @param {Object} modelObject
         *    Source object used to generate a "final object" with the desired properties to convert to JSON
         * @param {boolean} convertAllPropertiesDefinedInModel
         *    If true (or undefined) => transforms all properties.
         *    If false => excludes the properties returned by the function getPropertiesExcludedOfJsonConversion
         *    defined in the model definition.
         *
         * @returns {Object} with the properties that we want to save in the "future JSON string"
         *
         * @throws TypeError
         */
        function getRealObjectToConvertToJson (modelObject, convertAllPropertiesDefinedInModel) {

            // Title of the log/error messages
            var logTitle = TAG + '.getRealObjectToConvertToJson:';

            checkVariablesService.checkVariable (modelObject, ['!null', '!undefined', '!array'], logTitle + ' modelObject');
            checkVariablesService.checkVariable (modelObject.constructor, ['!null', '!undefined'], logTitle + ' modelObject has not a constructor');

            // Gets the properties that will be stored in the "future JSON string" belonging to the "current object"
            var propertiesToConvertToJson = [];
            if (convertAllPropertiesDefinedInModel == false && typeof modelObject.constructor.getPropertiesExcludedOfJsonConversion === 'function')
                propertiesToConvertToJson = _.difference (Object.keys (modelObject), modelObject.constructor.getPropertiesExcludedOfJsonConversion());
            else
                propertiesToConvertToJson = Object.keys (modelObject);

            // Gets the array of properties that need a model constructor
            var propertiesWithConstructor = [];
            if (typeof modelObject.constructor.getPropertiesWithModelConstructor === 'function')
                propertiesWithConstructor = modelObject.constructor.getPropertiesWithModelConstructor();

            // Creates the final representation of object that will be converted to Json
            var realObjectToConvertToJson = {};
            for (var prop in modelObject) {

                // Only converts the properties defined in propertiesToConvertToJson array
                if (modelObject.hasOwnProperty (prop) && propertiesToConvertToJson.indexOf (prop) != -1) {

                    // If the current property needs to be created using a model constructor
                    if (propertiesWithConstructor[prop]) {

                        if (angular.isArray (modelObject[prop])) {

                            realObjectToConvertToJson[prop] = [];
                            for (var i = 0; i < modelObject[prop].length; i++)
                                realObjectToConvertToJson[prop].push (getRealObjectToConvertToJson (modelObject[prop][i], convertAllPropertiesDefinedInModel));
                        }
                        // The property is not an array
                        else
                            realObjectToConvertToJson[prop] = (modelObject == null || modelObject[prop] == null)
                                                                  ? null
                                                                  : getRealObjectToConvertToJson (modelObject[prop], convertAllPropertiesDefinedInModel);
                    }
                    // The current property does not need to be created using a model constructor
                    else
                        realObjectToConvertToJson[prop] = modelObject[prop];
                }
            }
            return realObjectToConvertToJson;
        }

    }

})();
