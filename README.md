# Contract.Js
Simple data contract validation for javascript, typically on a data service layer where the api calls happens.
This is a dead simple implementation, its useful because there is a common issue, when a DTO is changes, it can possibly generate sometimes not obvious errors on the client side.
With this library you can make sure the data from the server is validated by the contracts.

### Usages

``` javascript
//Define a simple contract
var contract = {
       id: DataContract.Types.int,
       nested: {
           name: DataContract.Types.string,
           id: DataContract.Types.int,
           otherNested: {
               id: DataContract.Types.int
           }
       },
       customBoolProp: DataContract.Types.bool
   };
//We can validate the contract itself, this is useful when we initialize the application
var contractErrors = DataContract.Validator.validateContract(contract);
console.log(contractErrors);
```
After we defined and validated our contracts lets see how to use it
``` javascript
//Let's say we have a server which sends back this simple json
var serverData = {
    id: 0,
    nested: {
        name: "nestedObject",
        id: 10,
        otherNested: {
            id: 5
        }
    },
    customBoolProp: 10
};

//At this point we have the data from the server
var errors = DataContract.Validator.validateData(serverData, contract);
//See the accumulated errors in your data
console.log(errors);
```