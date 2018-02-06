(function () {
    'use strict';

    angular.module ('aml')
           .value ('OrderItemModel', OrderItemModel);

    function OrderItemModel() {
        this.id = null;
        this.product = null;
        this.quantity = null;
        this.price = null;
    }


    /**
     * Accessible functions when a new object is created
     *
     * @type {{constructor: OrderItemModel}}
     */
    OrderItemModel.prototype = {
        constructor: OrderItemModel,
        copy: copy,
        equals: equals,
        isNew: isNew
    };


    /**
     * Copies all properties of the given order item
     *
     * @param {OrderItemModel} other
     *    Object to copy
     */
    function copy (other) {

        if (typeof other === 'undefined' || other == null || typeof other.constructor === 'undefined' ||
               other.constructor.name != 'OrderItemModel')
            return;

        this.id = other.id;
        this.quantity = other.quantity;
        this.price = other.price;

        if (other.product !== null)
            this.product = other.product.copy();
    }


    /**
     * Returns TRUE if the current object is equal to the given one, FALSE otherwise.
     *
     * @param {OrderItemModel} other
     *    Object to compare
     *
     * @return {boolean}
     */
    function equals (other) {

        if (typeof other === 'undefined' || other == null || typeof other.constructor === 'undefined' ||
               other.constructor.name != 'OrderItemModel')
            return false;

        if (this.id !== other.id)
            return false;

        if (this.quantity !== other.quantity)
            return false;

        if (this.price !== other.price)
            return false;

        if ((this.product == null && other.product !== null) || !this.product.equals (other.product))
            return false;

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
    OrderItemModel.getPropertiesWithModelConstructor = function () {

        var result = [];
        result['product'] = 'ProductModel';

        return result;
    };


    /**
     *    Return an array with the properties that we don't want to
     * use when an object of this class is converted to a JSON string
     *
     * @returns {string[]}
     */
    OrderItemModel.getPropertiesExcludedOfJsonConversion = function () {
        return [];
    };

})();
