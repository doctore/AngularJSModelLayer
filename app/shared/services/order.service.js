/**
 * Helper functions used to work with orders
 */
(function () {
    'use strict';

    angular.module ('aml')
           .factory ('orderService', orderService);

    // Injections for this service
    orderService.$inject = ['$q', 'checkVariablesService', 'OrderModel', 'OrderItemModel', 'ProductModel'];

    /*
     * Constructor for this service
     */
    function orderService ($q, checkVariablesService, OrderModel, OrderItemModel, ProductModel) {

        //Log TAG
        var TAG = 'orderService';

        //Public API
        return {
            addOrder: addOrder,
            getAll: getAll
        };


        /**
         * Send a new order to the REST Api to persist it in database
         *
         * @param {OrderModel} newOrder
         *    Order to insert
         *
         * @return {promise} with the new order (OrderModel)
         *
         * @throws Error
         */
        function addOrder (newOrder) {

            // Title of the log/error messages
            var logTitle = TAG + '.addOrder';

            checkVariablesService.checkVariable (newOrder, ['!null', '!undefined', 'instanceof OrderModel'], logTitle + ' newOrder');

            // Only for testing purpose
            var defer = $q.defer();
            defer.resolve (newOrder);
            return defer.promise;

            /**
             * In a real REST API, the code could be:
             *
             * return $http.post ('Url to REST API' + WS.ORDER.POST
             *                   ,modelTransformerService.fromModelObjectToJson (newOrder, false).then (function (newOrderFromServer) {
             *
             *    if (newOrderFromServer != null && newOrderFromServer.data != null)
             *        return modelTransformerService.fromObjectToModel (newOrderFromServer.data, OrderModel);
             *    else
             *       throw new Error (logTitle + '. There was an error trying to add the order '
             *                      + modelTransformerService.fromModelObjectToJson (newOrder, false)
             *                      + 'in the server side. The information returned by API is null');
             * });
             */
        }


        /**
         * Get from database all existing orders
         *
         * @return {promise} with an array of all orders (OrderModel)
         *
         * @throws Error
         */
        function getAll() {

            var logTitle = TAG + '.getAll:';

            // Only for testing purpose
            var defer = $q.defer();

            var product = new ProductModel();
            product.id = 1;
            product.name = 'prod1';
            product.price = 11.2;
            product.createDate = '11-01-2018 12:34:57';

            var orderItem = new OrderItemModel();
            orderItem.id = 1;
            orderItem.product = product;
            orderItem.quantity = 5;
            orderItem.price = 5.61;

            var order = new OrderModel();
            order.id = 1;
            order.orderer = 'cust1';
            order.createDate = '01-02-2015 10:00:23';
            order.addOrderItem (orderItem);

            defer.resolve ([order]);
            return defer.promise;

            /**
             * In a real REST API, the code could be:
             *
             * return $http.get ('Url to REST API' + WS.ORDER.GET).then (function (ordersFromServer) {
             *
             *    if (ordersFromServer != null && ordersFromServer.data != null)
             *        return modelTransformerService.fromArrayToModel (ordersFromServer.data, OrderModel);
             *
             *    return [];
             * });
             */
        }

    }

})();