/**
 * Helper functions used to work with strings
 */
(function () {
    'use strict';

    angular.module ('aml')
           .factory ('stringService', stringService);

    // Injections for this service
    stringService.$inject = [];

    /*
     * Constructor for this service
     */
    function stringService() {

        // Log Tag
        var TAG = 'stringService';

        //Public API
        return {
            isJSON: isJSON,
            leftTrimOfString: leftTrimOfString
        };


        /**
         * Checks if the given string is a well-formed JSON string
         *
         * @param {string} string
         *    String to check
         *
         * @return {boolean} true if the given string is a "JSON string"
         */
        function isJSON(string) {

            try {
                JSON.parse (string);

            } catch (exceptionErrors) {
                return false;
            }
            return true;
        }


        /**
         * Removes the stringToDelete from the "left side" of srcString.
         *
         * @param {string} srcString
         *    Source string
         * @param {string} stringToDelete
         *    String to delete
         *
         * @return {string}
         */
        function leftTrimOfString (srcString, stringToDelete) {

            if (srcString == null)
                return null;

            if (stringToDelete == null || stringToDelete == '')
                return srcString;

            var posOfStringToDelete = srcString.indexOf (stringToDelete);
            if (posOfStringToDelete == -1)
                return srcString;

            return srcString.substr (posOfStringToDelete + stringToDelete.length, srcString.length - 1).trim();
        }

    }

})();
