(function () {
    'use strict';
    // Declare app level module which depends on views, and components
    angular.module('aml', [
        'ngRoute',
        'ngCookies', // The ngCookies module provides a convenient wrapper for reading and writing browser cookies. See $cookies for usage.
        'ngSanitize' // The ngSanitize module provides functionality to sanitize HTML. See $sanitize for usage
    ]);
})();
