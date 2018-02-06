(function () {
    'use strict';

    angular.module('aml')
        .constant('CONSTANTS', AML_GLOBAL_CONSTANTS)
        .constant('WS', WS_ROUTES)
        .run(startupApplication);
        
    startupApplication.$inject = ['CONSTANTS'];
    
    
    function startupApplication (CONSTANTS) {}

})();
