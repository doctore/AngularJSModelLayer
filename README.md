# AngularJS model layer

- [Why this project was created?](#why-this-project-was-created)
- [Modules included in this project](#modules-included-in-this-project)
- [CheckVariablesService](#checkvariablesservice)
- [Use AngularJS values as models](#use-angularjs-values-as-models)
- [ModelTransformerService](#modeltransformerservice)

## Why this project was created?

Really **AngularJS** has not a real model layer, the developers can use *$scope* variable to store on it every thing they want but without a real control about what is the content
of this variable. This is the reason why I developed this functionality in 2016.

## Modules included in this project

There are several functionalities included in this small project:
   
* **CheckVariablesService**: helper functions used to check the type of Javascript variables (allowing us include several rules to verify).
* **A real model layer**: using AngularJS values to define our custom models (used anywhere you need on your AngularJS application).
* **ModelTransformerService**: helper functions used to transform a JSON string or array to a Javascript object (Models as AngularJS values) and vice versa.

## CheckVariablesService

To be sure about the content and type of the Javascript variables we are using, several rules have been included in this service. And we can see an example
of its behaviour in the next code:

```javascript
/**
 * Removes an order whose identifier is given by parameter
 *
 * @param {number} orderId
 *    Identifier of the order to delete
 *
 * @return {promise} with the result of WS (HTTP code)
 *
 * @throws Error
 */
function deleteOrder (orderId) {
 
   // Title of the log/error messages
   var logTitle = 'deleteOrder';
 
   checkVariablesService.checkVariable (orderId, ['!null', '!undefined', 'number'], logTitle + ' orderId');
   ...
}
```

Now we can see what happens if we invoke this function with a *null* value as parameter:

```javascript
var orderId = 'AA';
  
deleteOrder (orderId);

// It will returns:
TypeError ('deleteOrder orderId: AA [is not number]')
```

*Please see this service definition for more information*.

## Use AngularJS values as models

A way to represent a model layer in AngularJS using its values as entities is the following:

```javascript
(function () {
    'use strict';

    angular.module ('aml')
           .value ('ProductModel', ProductModel);

    function ProductModel() {
        this.id = null;
        this.name = null;
    }

    /**
     * Accessible functions when a new object is created
     *
     * @type {{constructor: ProductModel}}
     */
    ProductModel.prototype = {
        constructor: ProductModel
    };

})();
```

As you can see, **ProductModel** is a very simple object that contains only two properties: *id* and *name*. No more code is required if you want to work
with the more simplest form of this AngularJS real model layer. However, if you want, a more complex version can be developed of this one:

```javascript
(function () {
    'use strict';

    angular.module ('aml')
           .value ('OrderItemModel', OrderItemModel);

    function OrderItemModel() {
        this.id = null;
        this.product = null;
        this.price = null;
        this.labelOnClientSide = null;
    }

    /**
     * Accessible functions when a new object is created
     *
     * @type {{constructor: OrderItemModel}}
     */
    OrderItemModel.prototype = {
        constructor: OrderItemModel
    };

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
        return ['labelOnClientSide'];
    };

})();
```

This second example, **OrderItemModel**, allows us to explain some useful functions used by **ModelTransformerService** (*those ones are not required, 
nothing will happen if the model does not implement them*):

* **getPropertiesWithModelConstructor**: invoked when a property needs to be created using another model.
* **getPropertiesExcludedOfJsonConversion**: properties excluded when we want to convert objects of the model to a JSON string.

From now, we can create instances of any model described above:

```javascript
var product = new ProductModel();
product.id = 1;
product.name = 'prod1';

var orderItem = new OrderItemModel();
orderItem.id = 1;
orderItem.product = product;
orderItem.price = 5.61;
```

If we want, we can add more functionality to a model. For example:

```javascript
(function () {
    'use strict';

    angular.module ('aml')
           .value ('ProductModel', ProductModel);

    function ProductModel() {
        this.id = null;
        this.name = null;
        this.price = null;
        this.createDate = null;
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
    
})();
```
## ModelTransformerService

Helper functions used to transform a JSON string, Javascript object or array of them to an object/s described in Models as AngularJS values, and vice versa. Currently the service has the following methods:

* **fromArrayToModel**: converts an array of Javascript objects to an array of required Model.
* **fromJsonArrayToModel**: converts a JSON string which contains an "array of objects" to an array of required Model
* **fromJsonToModel**: converts a JSON string which contains "only one object" to an object of required Model
* **fromModelArrayToJson**: converts an array of objects belonging to a specific Model to a JSON string which contains an "array of objects".
* **fromModelObjectToJson**: converts an object belonging to a specific Model to a JSON string.
* **fromObjectToModel**: converts a Javascript object to an object of required Model.

It is important to know the following rules:

**1.** If the "final object" is a Model, only the properties defined on it will be copied, that is, the "transformation functions" will discard the properties from the "origin Javascript object / JSON" that
do not exist in the "final Model object".

**2.** If we want to convert a Model object (or array of them) to a JSON string using **fromModelArrayToJson** or **fromModelObjectToJson**, both methods have the following parameter:
```
* @param {boolean} convertAllPropertiesDefinedInModel
*    If true (or undefined) => transforms all properties.
*    If false => excludes the properties returned by the function getPropertiesExcludedOfJsonConversion 
                 defined in the model definition.
```

Now, the next step is to learn how we can use those methods:

```javascript
/**
 * Service used to manage the operations related with the products in the application.
 */
(function () {
    'use strict';
 
    angular.module ('aml')
           .factory ('productService', productService);
 
    // Injections for this service
    productService.$inject = ['$http', 'checkVariablesService', 'CONFIG', 'modelTransformerService', 'ProductModel', 'WS'];
 
    /*
     * Constructor for this service
     */
    function productService ($http, checkVariablesService, CONFIG, modelTransformerService, ProductModel, WS) {
 
        // Log Tag
        var TAG = 'productService';
 
        //Public API
        return {
            addNewProduct : addNewProduct,
            getAllProducts : getAllProducts
        };
 
 
        /**
         * Send a new product to the REST Api to persist it in database
         *
         * @param {ProductModel} newProduct
         *    Product to insert
         *
         * @return {promise} with the new product (ProductModel)
         *
         * @throws Error
         */
        function addNewProduct (newProduct) {
 
            // Title of the log/error messages
            var logTitle = TAG + '.addNewProduct';
 
            checkVariablesService.checkVariable (newProduct, ['!null', '!undefined', 'instanceof ProductModel'], logTitle + ' newProduct');
 
            // Executes add product WS
            return $http.post (CONFIG.APP.REST_API + WS.PRODUCT.POST
                              ,modelTransformerService.fromModelObjectToJson (newProduct, false)).then (function (newProductFromServer) {
 
                if (newProductFromServer != null && newProductFromServer.data != null) {
                    return modelTransformerService.fromObjectToModel (newProductFromServer.data, ProductModel);
                }
                else {
                    throw new Error (logTitle + '. There was an error trying to add the product '
                                   + modelTransformerService.fromModelObjectToJson (newProduct, false)
                                   + 'in the server side. The information returned by API is null');
                }
            });
        }
 
 
        /**
         * Gets from the server the list of products.
         *
         * @return {promise} with an array of products (ProductModel)
         */
        function getAllProducts() {
 
            // Executes get products WS
            return $http.get (CONFIG.APP.REST_API + WS.PRODUCT.GET).then (function (productsList) {
 
                if (productsList != null && productsList.data != null) {
                    return modelTransformerService.fromArrayToModel (productsList.data, ProductModel);
                }
                return [];
            });
        } 
    } 
})();
```
