# AngularJSModelLayer

- [Why this project was created?](#why-this-project-was-created)
- [Modules included in this project](#modules-included-in-this-project)
- [CheckVariablesService](#checkVariablesService)

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
var orderId = null;
  
deleteOrder (orderId)   

// It will returns:
TypeError ('deleteOrder orderId: null [is null] [is not number]')
```

*Please see this service definition for more information*.