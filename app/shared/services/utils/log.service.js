/**
 * Helper functions used to logging different messages with different severity to the console.
 */
(function () {
    'use strict';

    angular.module('aml')
        .factory('logService', logService);

    logService.$inject = ['$window', '$log'];

    function logService ($window, $log) {

        // Get log level and pattern from config
        var logPattern = 'YYYY-MM-DD HH:mm:ss';

        // Public API
        return {
            log: log,
            debug: debug,
            info: info,
            warn: warn,
            error: error
        };

        // Define log pattern
        function pattern (tag, message) {
            return $window.moment().format(logPattern) + ' | ' + tag + ' - ' + message;
        }

        // Persistent Log (log level independent), like info
        function log (tag, message) {
            $log.info (pattern (tag, message));
        }

        // Debug
        function debug (tag, message) {
            $log.debug (pattern (tag, message));
        }

        // Info
        function info (tag, message) {
        	$log.info (pattern (tag, message));
        }

        // Warn
        function warn (tag, message) {
            $log.warn (pattern (tag, message));
        }

        // Error
        function error (tag, message) {
            $log.error (pattern (tag, message));
        }
    }

})();
