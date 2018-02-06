(function () {
    'use strict';
    angular.module ('aml')
           .controller ('MainController', MainController);

    MainController.$inject = ['logService', 'orderService'];

    function MainController (logService, orderService) {

        // Log Tag
        var TAG = 'MainController';

        initialization();


        /**
         * Loads the list of check events stored in database
         */
        function initialization() {

            // Title of the log messages
            var logTitle = TAG + '.initialization:';
        	
            try {
                // Update the check event with the information of its template and persist
                orderService.getAll().then (function (orders) {

                    console.log (orders);

                // Errors generated in functions that return a promise
                }).catch (function (promiseErrors) {
                    logService.error (logTitle, promiseErrors);
                });

            // Errors caused by exceptions
            } catch (exceptionErrors) {
                logService.error (logTitle, exceptionErrors);
            }
        }

    }

})();
