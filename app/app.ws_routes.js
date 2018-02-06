'use strict';

var WS_ROUTES = {

    ORDERS: {
        GET: '/orders',
        POST: '/orders'
    }

};

// Just for grunt purpose to include the config
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = WS_ROUTES;
}

