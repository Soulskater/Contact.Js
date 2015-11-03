var DataContract = DataContract || {};
DataContract.Errors = (function () {

    return {
        propertyNotFound: function (propertyName, path) {
            var fullPath = path === "" ? propertyName : path + "." + propertyName;
            return "Property with name " + fullPath + " was not found";
        },
        unexpectedProperty: function (propertyName, path) {
            var fullPath = path === "" ? propertyName : path + "." + propertyName;
            return "Unknown property with name " + fullPath + " on data, missing from contract";
        },
        typeMismatch: function (propertyName, expected, data, path) {
            var fullPath = path === "" ? propertyName : path + "." + propertyName;
            return "Type mismatch on " + fullPath + " expected " + expected + ", got " + typeof data;
        },
        contractPropertyTypeError: function (propertyName, path) {
            var fullPath = path === "" ? propertyName : path + "." + propertyName;
            return "Not valid type definition for property " + fullPath;
        }
    }
})();