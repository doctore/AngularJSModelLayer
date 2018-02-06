(function () {
    'use strict';

    angular.module('aml')
        .config(configure);

    configure.$inject = ['$routeProvider', 'CONSTANTS'];

    function configure ($routeProvider, CONSTANTS) {
    	
        // Main page
        $routeProvider.when (CONSTANTS.URL.APPLICATION.MAIN, {
            templateUrl: CONSTANTS.PATH.COMPONENTS + 'main/main.view.html',
            controller: 'MainController',
            controllerAs: 'mainCtrl'
        });
    }
})();
