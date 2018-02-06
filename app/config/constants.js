'use strict';

var AML_GLOBAL_CONSTANTS = {

	// HTTP Codes
    HTTP_CODES: {
        OK: 200,
        INTERNAL_SERVER_ERROR: 500
    },

    // Format when a new Date is generated
    DATETIME_FORMAT: 'DD-MM-YYYY HH:mm:ss',

    // Path of the different files that the application manages
    PATH: {
        APP:'app/',
        SHARED: 'app/shared/',
        COMPONENTS: 'app/components/'
    },

    // Urls used in the application
    URL: {
        // Root paths in the application
        APPLICATION: {
            MAIN: '/main'
        }
    }
    
};


//Just for grunt purpose to include the constants
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = AML_GLOBAL_CONSTANTS;
}