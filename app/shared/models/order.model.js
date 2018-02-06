(function () {
    'use strict';

    angular.module ('aml')
        .value ('OrderModel', OrderModel);

    function OrderModel() {
        this.id = null;
        this.orderer = null;
        this.createDate = null;
        this.orderItems = null;
    }


    /**
     * Accessible functions when a new object is created
     *
     * @type {{constructor: OrderModel}}
     */
    OrderModel.prototype = {
        constructor: OrderModel,
        addOrderItem: addOrderItem,
        copy: copy,
        equals: equals,
        isNew: isNew
    };


    /**
     * Add a new order item to the current order
     *
     * @param {OrderModel} orderItem
     *    Order item to add
     */
    function addOrderItem (orderItem) {

        if (!angular.isArray (this.orderItems))
            this.orderItems = [];

        if (typeof orderItem !== 'undefined' && orderItem != null && typeof orderItem.constructor !== 'undefined' &&
               orderItem.constructor.name == 'OrderItemModel')
            this.orderItems.push (orderItem);
    }


    /**
     * Copies all properties of the given order
     *
     * @param {OrderModel} other
     *    Object to copy
     */
    function copy (other) {

        if (typeof other === 'undefined' || other == null || typeof other.constructor === 'undefined' ||
               other.constructor.name != 'OrderModel')
            return;

        this.id = other.id;
        this.orderer = other.orderer;
        this.createDate = other.createDate;

        if (other.orderItems != null) {

            this.orderItems = [];
            for (var i = 0; i < other.orderItems.length; i++)
                this.orderItems.push (other.orderItems[i].copy());
        }
    }


    /**
     * Returns TRUE if the current object is equal to the given one, FALSE otherwise.
     *
     * @param {OrderModel} other
     *    Object to compare
     *
     * @return {boolean}
     */
    function equals (other) {

        if (typeof other === 'undefined' || other == null || typeof other.constructor === 'undefined' ||
               other.constructor.name != 'OrderModel')
            return false;

        if (this.id !== other.id)
            return false;

        if (this.orderer !== other.orderer)
            return false;

        if (this.createDate !== other.createDate)
            return false;

        if ((this.orderItems == null && other.orderItems != null) ||
               (this.orderItems != null && other.orderItems == null))
            return false;

        if ((this.orderItems != null && other.orderItems != null) &&
               (this.orderItems.length !== other.orderItems.length))
            return false;

        for (var i = 0; i < this.orderItems.length; i++) {
            if (!this.orderItems[i].equals (other.orderItems[i]))
                return false;
        }
        return true;
    }


    /**
     * Returns TRUE if the current locker has not been saved on "server side" yet, FALSE otherwise.
     *
     * @return {boolean}
     */
    function isNew() {
        return this.id == null;
    }


    /**
     *    Return an array with the properties that need to be created
     * using a specific model.
     *
     * @return {Array}
     */
    OrderModel.getPropertiesWithModelConstructor = function () {

        var result = [];
        result['orderItems'] = 'OrderItemModel';

        return result;
    };


    /**
     *    Return an array with the properties that we don't want to
     * use when an object of this class is converted to a JSON string
     *
     * @returns {string[]}
     */
    OrderModel.getPropertiesExcludedOfJsonConversion = function () {
        return [];
    };

})();
