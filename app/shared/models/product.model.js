(function () {
    'use strict';

    angular.module ('aml')
           .value ('ProductModel', ProductModel);

    function ProductModel() {
        this.id = null;
        this.name = null;
        this.price = null;
        this.createDate = null;
        this.labelOnClientSide = null;
    }


    /**
     * Accessible functions when a new object is created
     *
     * @type {{constructor: ProductModel}}
     */
    ProductModel.prototype = {
        constructor: ProductModel,
        copy: copy,
        equals: equals,
        isNew: isNew
    };


    /**
     * Copies all properties of the given product
     *
     * @param {ProductModel} other
     *    Object to copy
     */
    function copy (other) {

        if (typeof other === 'undefined' || other == null || typeof other.constructor === 'undefined' ||
               other.constructor.name != 'ProductModel')
            return;

        this.id = other.id;
        this.name = other.name;
        this.price = other.price;
        this.createDate = other.createDate;
        this.labelOnClientSide = other.labelOnClientSide;
    }


    /**
     * Returns TRUE if the current object is equal to the given one, FALSE otherwise.
     *
     * @param {ProductModel} other
     *    Object to compare
     *
     * @return {boolean}
     */
    function equals (other) {

        if (typeof other === 'undefined' || other == null || typeof other.constructor === 'undefined' ||
               other.constructor.name != 'ProductModel')
            return false;

        if (this.id !== other.id)
            return false;

        if (this.name !== other.name)
            return false;

        if (this.price !== other.price)
            return false;

        if (this.createDate !== other.createDate)
            return false;

        if (this.labelOnClientSide !== other.labelOnClientSide)
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
    ProductModel.getPropertiesWithModelConstructor = function () {
        return [];
    };


    /**
     *    Return an array with the properties that we don't want to
     * use when an object of this class is converted to a JSON string
     *
     * @returns {string[]}
     */
    ProductModel.getPropertiesExcludedOfJsonConversion = function () {
        return ['labelOnClientSide'];
    };

})();
