'use strict';

describe('Testing Model Transformer Service', function() {

    var modelTransformerService;
    var orderModel, orderItemModel, productModel;

    beforeEach (function() {
        module ('aml');
        inject (function ($injector) {
            modelTransformerService = $injector.get ('modelTransformerService');
            orderModel = $injector.get ('OrderModel');
            orderItemModel = $injector.get ('OrderItemModel');
            productModel = $injector.get ('ProductModel');
        });
    });


    it('[fromArrayToModel] Not valid parameters', function() {

        expect (function() { modelTransformerService.fromArrayToModel (null, productModel); } ).toThrowError (TypeError);
        expect (function() { modelTransformerService.fromArrayToModel ([], null); } ).toThrowError (TypeError);
        expect (function() { modelTransformerService.fromArrayToModel ([], 12); } ).toThrowError (TypeError);
    });


    it('[fromArrayToModel] Not array given', function() {

        var productObject = {id:1, name:'prod1', price:11.2, createDate:'11-01-2018 12:34:57'};

        var expectedProduct = new productModel();
        expectedProduct.id = 1;
        expectedProduct.name = 'prod1';
        expectedProduct.price = 11.2;
        expectedProduct.createDate = '11-01-2018 12:34:57';

        var transformedProduct = modelTransformerService.fromArrayToModel (productObject, productModel);
        expect (transformedProduct).toBeDefined();
        expect (transformedProduct.equals (expectedProduct)).toBeTruthy();
    });


    it('[fromArrayToModel] An array given', function() {

        var productObjects = [{id:1, name:'prod1', price:11.2, createDate:'11-01-2018 12:34:57'}
                             ,{id:2, name:'prod2', price:9.3, createDate:'12-01-2018 13:45:01'}];

        var expectedProduct1 = new productModel();
        expectedProduct1.id = 1;
        expectedProduct1.name = 'prod1';
        expectedProduct1.price = 11.2;
        expectedProduct1.createDate = '11-01-2018 12:34:57';

        var expectedProduct2 = new productModel();
        expectedProduct2.id = 2;
        expectedProduct2.name = 'prod2';
        expectedProduct2.price = 9.3;
        expectedProduct2.createDate = '12-01-2018 13:45:01';

        var transformedProducts = modelTransformerService.fromArrayToModel (productObjects, productModel);
        expect (transformedProducts).toBeDefined();
        expect (transformedProducts.length).toBe (productObjects.length);
        expect (transformedProducts[0].equals (expectedProduct1)).toBeTruthy();
        expect (transformedProducts[1].equals (expectedProduct2)).toBeTruthy();
    });


    it('[fromJsonArrayToModel] Not valid parameters', function() {

        expect (function() { modelTransformerService.fromJsonArrayToModel (null, productModel); } ).toThrowError (TypeError);
        expect (function() { modelTransformerService.fromJsonArrayToModel ([], null); } ).toThrowError (TypeError);
        expect (function() { modelTransformerService.fromJsonArrayToModel ([], 12); } ).toThrowError (TypeError);
    });


    it('[fromJsonArrayToModel] Not array given', function() {

        var productJson = '{"id":1,"name":"prod1","price":11.2,"createDate":"11-01-2018 12:34:57"}';

        var expectedProduct = new productModel();
        expectedProduct.id = 1;
        expectedProduct.name = 'prod1';
        expectedProduct.price = 11.2;
        expectedProduct.createDate = '11-01-2018 12:34:57';

        var transformedProduct = modelTransformerService.fromJsonArrayToModel (productJson, productModel);
        expect (transformedProduct).toBeDefined();
        expect (transformedProduct.equals (expectedProduct)).toBeTruthy();
    });


    it('[fromJsonArrayToModel] An array given', function() {

        var productJsonArray = ['{"id":1,"name":"prod1","price":11.2,"createDate":"11-01-2018 12:34:57"}'
                               ,'{"id":2,"name":"prod2","price":9.3,"createDate":"12-01-2018 13:45:01"}'];

        var expectedProduct1 = new productModel();
        expectedProduct1.id = 1;
        expectedProduct1.name = 'prod1';
        expectedProduct1.price = 11.2;
        expectedProduct1.createDate = '11-01-2018 12:34:57';

        var expectedProduct2 = new productModel();
        expectedProduct2.id = 2;
        expectedProduct2.name = 'prod2';
        expectedProduct2.price = 9.3;
        expectedProduct2.createDate = '12-01-2018 13:45:01';

        var transformedProducts = modelTransformerService.fromJsonArrayToModel (productJsonArray, productModel);
        expect (transformedProducts).toBeDefined();
        expect (transformedProducts.length).toBe (productJsonArray.length);
        expect (transformedProducts[0].equals (expectedProduct1)).toBeTruthy();
        expect (transformedProducts[1].equals (expectedProduct2)).toBeTruthy();
    });


    it('[fromJsonToModel] Not valid parameters', function() {

        expect (function() { modelTransformerService.fromJsonToModel (null, productModel); } ).toThrowError (TypeError);
        expect (function() { modelTransformerService.fromJsonToModel (12, productModel); } ).toThrowError (TypeError);
        expect (function() { modelTransformerService.fromJsonToModel ('{', productModel); } ).toThrowError (TypeError);
        expect (function() { modelTransformerService.fromJsonToModel ('{"id":1}', null); } ).toThrowError (TypeError);
        expect (function() { modelTransformerService.fromJsonToModel ('{"id":1}', 12); } ).toThrowError (TypeError);
    });


    it('[fromJsonToModel] Not array given', function() {

        var productJson = '{"id":1,"name":"prod1","price":11.2,"createDate":"11-01-2018 12:34:57"}';
        var orderItemJson = '{"id":1,"product":' + productJson + ',"quantity":5,"price":5.61}';
        var orderJson = '{"id":1,"orderer":"customer1","createDate":"01-02-2015 10:00:23","orderItems":[' + orderItemJson + ']}';

        var expectedProduct = new productModel();
        expectedProduct.id = 1;
        expectedProduct.name = 'prod1';
        expectedProduct.price = 11.2;
        expectedProduct.createDate = '11-01-2018 12:34:57';

        var expectedOrderItem = new orderItemModel();
        expectedOrderItem.id = 1;
        expectedOrderItem.product = expectedProduct;
        expectedOrderItem.quantity = 5;
        expectedOrderItem.price = 5.61;

        var expectedOrder = new orderModel();
        expectedOrder.id = 1;
        expectedOrder.orderer = 'customer1';
        expectedOrder.createDate = '01-02-2015 10:00:23';
        expectedOrder.addOrderItem (expectedOrderItem);

        var transformedOrder = modelTransformerService.fromJsonToModel (orderJson, orderModel);
        expect (transformedOrder).toBeDefined();
        expect (transformedOrder.equals (expectedOrder)).toBeTruthy();

        // Json with properties not included in ProductModel
        var objectJson = '{"id":1,"name":"prod1","price":11.2,"createDate":"11-01-2018 12:34:57","newProperty":"new"}';

        var transformedProduct = modelTransformerService.fromJsonToModel (objectJson, productModel);
        expect (transformedProduct).toBeDefined();
        expect (transformedProduct.equals (expectedProduct)).toBeTruthy();
        expect (transformedProduct.newProperty).toBeUndefined();
    });


    it('[fromJsonToModel] An array given', function() {

        var product1Json = '{"id":1,"name":"prod1","price":11.2,"createDate":"11-01-2018 12:34:57"}';
        var product2Json = '{"id":2,"name":"prod2","price":9.3,"createDate":"12-01-2018 13:45:01"}';

        var orderItem1Json = '{"id":1,"product":' + product1Json + ',"quantity":5,"price":5.61}';
        var orderItem2Json = '{"id":2,"product":' + product2Json + ',"quantity":9,"price":0.12}';

        var orderJsonArray = '[{"id":1,"orderer":"cust1","createDate":"01-02-2015 10:00:23","orderItems":[]}'
                           + ',{"id":2,"orderer":"cust2","createDate":"11-03-2016 11:23:25","orderItems":[' + orderItem1Json + ','+ orderItem2Json + ']}]';

        var expectedProduct1 = new productModel();
        expectedProduct1.id = 1;
        expectedProduct1.name = 'prod1';
        expectedProduct1.price = 11.2;
        expectedProduct1.createDate = '11-01-2018 12:34:57';

        var expectedProduct2 = new productModel();
        expectedProduct2.id = 2;
        expectedProduct2.name = 'prod2';
        expectedProduct2.price = 9.3;
        expectedProduct2.createDate = '12-01-2018 13:45:01';

        var expectedOrderItem1 = new orderItemModel();
        expectedOrderItem1.id = 1;
        expectedOrderItem1.product = expectedProduct1;
        expectedOrderItem1.quantity = 5;
        expectedOrderItem1.price = 5.61;

        var expectedOrderItem2 = new orderItemModel();
        expectedOrderItem2.id = 2;
        expectedOrderItem2.product = expectedProduct2;
        expectedOrderItem2.quantity = 9;
        expectedOrderItem2.price = 0.12;

        var expectedOrder1 = new orderModel();
        expectedOrder1.id = 1;
        expectedOrder1.orderer = 'cust1';
        expectedOrder1.createDate = '01-02-2015 10:00:23';
        expectedOrder1.orderItems = [];

        var expectedOrder2 = new orderModel();
        expectedOrder2.id = 2;
        expectedOrder2.orderer = 'cust2';
        expectedOrder2.createDate = '11-03-2016 11:23:25';
        expectedOrder2.addOrderItem (expectedOrderItem1);
        expectedOrder2.addOrderItem (expectedOrderItem2);

        var transformedOrders = modelTransformerService.fromJsonToModel (orderJsonArray, orderModel);
        expect (transformedOrders).toBeDefined();
        expect (transformedOrders.length).toBe (2);
        expect (transformedOrders[0].equals (expectedOrder1)).toBeTruthy();
        expect (transformedOrders[1].equals (expectedOrder2)).toBeTruthy();
    });


    it('[fromModelArrayToJson] Not valid parameters', function() {

        expect (function() { modelTransformerService.fromModelArrayToJson(); } ).toThrowError (TypeError);
        expect (function() { modelTransformerService.fromModelArrayToJson (null); } ).toThrowError (TypeError);
        expect (function() { modelTransformerService.fromModelArrayToJson (null, true); } ).toThrowError (TypeError);
    });


    it('[fromModelArrayToJson] Not array given', function() {

        var product = new productModel();
        product.id = 1;
        product.name = 'prod1';
        product.price = 11.2;
        product.createDate = '11-01-2018 12:34:57';
        product.labelOnClientSide = 'label_product';

        var expectedProductJsonAllProperties = '{"id":1,"name":"prod1","price":11.2,"createDate":"11-01-2018 12:34:57","labelOnClientSide":"label_product"}';
        var expectedProductJsonNotAllProperties = '{"id":1,"name":"prod1","price":11.2,"createDate":"11-01-2018 12:34:57"}';

        var transformedProductAllProperties = modelTransformerService.fromModelArrayToJson (product, true);
        expect (transformedProductAllProperties).toBeDefined();
        expect (transformedProductAllProperties === expectedProductJsonAllProperties).toBeTruthy();

        var transformedProductNotAllProperties = modelTransformerService.fromModelArrayToJson (product, false);
        expect (transformedProductNotAllProperties).toBeDefined();
        expect (transformedProductNotAllProperties === expectedProductJsonNotAllProperties).toBeTruthy();
    });


    it('[fromModelArrayToJson] An array given', function() {

        var product1 = new productModel();
        product1.id = 1;
        product1.name = 'prod1';
        product1.price = 11.2;
        product1.createDate = '11-01-2018 12:34:57';
        product1.labelOnClientSide = 'label_product1';

        var product2 = new productModel();
        product2.id = 2;
        product2.name = 'prod2';
        product2.price = 9.3;
        product2.createDate = '12-01-2018 13:45:01';

        var orderItem1 = new orderItemModel();
        orderItem1.id = 1;
        orderItem1.product = product1;
        orderItem1.quantity = 5;
        orderItem1.price = 5.61;

        var orderItem2 = new orderItemModel();
        orderItem2.id = 2;
        orderItem2.product = product2;
        orderItem2.quantity = 9;
        orderItem2.price = 0.12;

        var expectedOrderItemsJson = '[{"id":1,"product":{"id":1,"name":"prod1","price":11.2,"createDate":"11-01-2018 12:34:57"},"quantity":5,"price":5.61}'
                                   + ',{"id":2,"product":{"id":2,"name":"prod2","price":9.3,"createDate":"12-01-2018 13:45:01"},"quantity":9,"price":0.12}]';

        var transformedOrderItemsNotAllProperties = modelTransformerService.fromModelArrayToJson ([orderItem1, orderItem2], false);
        expect (transformedOrderItemsNotAllProperties).toBeDefined();
        expect (transformedOrderItemsNotAllProperties === expectedOrderItemsJson).toBeTruthy();
    });


    it('[fromModelObjectToJson] Not valid parameters', function() {

        expect (function() { modelTransformerService.fromModelObjectToJson(); } ).toThrowError (TypeError);
        expect (function() { modelTransformerService.fromModelObjectToJson (null); } ).toThrowError (TypeError);
        expect (function() { modelTransformerService.fromModelObjectToJson ([]); } ).toThrowError (TypeError);
    });


    it('[fromModelObjectToJson] Valid transformations', function() {

        var product = new productModel();
        product.id = 1;
        product.name = 'prod1';
        product.price = 11.2;
        product.createDate = '11-01-2018 12:34:57';
        product.labelOnClientSide = 'label_product1';

        var orderItem = new orderItemModel();
        orderItem.id = 1;
        orderItem.product = product;
        orderItem.quantity = 5;
        orderItem.price = 5.61;

        var expectedOrderItemJsonAllProperties = '{"id":1,"product":{"id":1,"name":"prod1","price":11.2,"createDate":"11-01-2018 12:34:57","labelOnClientSide":"label_product1"},"quantity":5,"price":5.61}';
        var expectedOrderItemJsonNotAllProperties = '{"id":1,"product":{"id":1,"name":"prod1","price":11.2,"createDate":"11-01-2018 12:34:57"},"quantity":5,"price":5.61}';

        var transformedOrderItemsAllProperties = modelTransformerService.fromModelObjectToJson (orderItem, true);
        expect (transformedOrderItemsAllProperties).toBeDefined();
        expect (transformedOrderItemsAllProperties === expectedOrderItemJsonAllProperties).toBeTruthy();

        var transformedOrderItemsNotAllProperties = modelTransformerService.fromModelObjectToJson (orderItem, false);
        expect (transformedOrderItemsNotAllProperties).toBeDefined();
        expect (transformedOrderItemsNotAllProperties === expectedOrderItemJsonNotAllProperties).toBeTruthy();
    });


    it('[fromObjectToModel] Not valid parameters', function() {

        expect (function() { modelTransformerService.fromObjectToModel(); } ).toThrowError (TypeError);
        expect (function() { modelTransformerService.fromObjectToModel (null); } ).toThrowError (TypeError);
        expect (function() { modelTransformerService.fromObjectToModel ([]); } ).toThrowError (TypeError);

        expect (function() { modelTransformerService.fromObjectToModel ({'id':1}); } ).toThrowError (TypeError);
        expect (function() { modelTransformerService.fromObjectToModel ({'id':1}, null); } ).toThrowError (TypeError);
        expect (function() { modelTransformerService.fromObjectToModel ({'id':1}, 12); } ).toThrowError (TypeError);
    });


    it('[fromObjectToModel] Single object', function() {

        var sourceObject = {id:1, name:'prod1', price:11.2, origin:'Spain'};

        var expectedProduct = new productModel();
        expectedProduct.id = 1;
        expectedProduct.name = 'prod1';
        expectedProduct.price = 11.2;

        var transformedProduct = modelTransformerService.fromObjectToModel (sourceObject, productModel);
        expect (transformedProduct).toBeDefined();
        expect (transformedProduct.equals (expectedProduct)).toBeTruthy();
        expect (transformedProduct.createDate).toBeNull();
        expect (transformedProduct.labelOnClientSide).toBeNull();
        expect (transformedProduct.origin).toBeUndefined();
    });


    it('[fromObjectToModel] Hierarchy of objects', function() {

        var objectSimilarToProduct = {id:1, name:'prod1', price:11.2, origin:'Spain'};
        var objectSimilarToOrderItem = {id:1, product:objectSimilarToProduct, quantity:5, lineNumber: 12};
        var objectSimilarToOrder = {id:1, orderer:'customer1', createDate:'01-02-2015 10:00:23', orderItems:[objectSimilarToOrderItem]};

        var expectedProduct = new productModel();
        expectedProduct.id = 1;
        expectedProduct.name = 'prod1';
        expectedProduct.price = 11.2;

        var expectedOrderItem = new orderItemModel();
        expectedOrderItem.id = 1;
        expectedOrderItem.product = expectedProduct;
        expectedOrderItem.quantity = 5;

        var expectedOrder = new orderModel();
        expectedOrder.id = 1;
        expectedOrder.orderer = 'customer1';
        expectedOrder.createDate = '01-02-2015 10:00:23';
        expectedOrder.addOrderItem (expectedOrderItem);

        var transformedOrder = modelTransformerService.fromObjectToModel (objectSimilarToOrder, orderModel, true);
        expect (transformedOrder).toBeDefined();
        expect (transformedOrder.equals (expectedOrder)).toBeTruthy();

        expect (transformedOrder.orderItems).toBeDefined();
        expect (transformedOrder.orderItems.length).toEqual(1);
        expect (transformedOrder.orderItems[0].equals (expectedOrderItem)).toBeTruthy();
        expect (transformedOrder.orderItems[0].price).toBeNull();
        expect (transformedOrder.orderItems[0].lineNumber).toBeUndefined();

        expect (transformedOrder.orderItems[0].product).toBeDefined();
        expect (transformedOrder.orderItems[0].product.equals (expectedProduct)).toBeTruthy();
        expect (transformedOrder.orderItems[0].product.createDate).toBeNull();
        expect (transformedOrder.orderItems[0].product.labelOnClientSide).toBeNull();
        expect (transformedOrder.orderItems[0].product.origin).toBeUndefined();
    });

});
