var DataContract = DataContract || {};
DataContract.Validator = (function (types, errorBuilder) {

    return {
        validateData: _validateData,
        validateContract: _validateContract
    };

    function _validateContract(contract, pathList) {
        var errors = [];
        var pathList = pathList || [];
        for (propName in contract) {
            if (contract.hasOwnProperty(propName)) {
                var descriptor = contract[propName];
                if (typeof descriptor === "object") {
                    pathList.push(propName);
                    errors = errors.concat(_validateContract(descriptor, pathList));
                    pathList.pop();
                } else if (!types.getTypeByName(descriptor._name_)) {
                    errors.push(errorBuilder.contractPropertyTypeError(propName, pathList.join(".")));
                }
            }
        }
        return errors;
    }

    function _validateData(data, contract, pathList) {
        var errors = [];
        pathList = pathList || [];
        errors = errors.concat(_checkContract(data, contract, pathList)).concat(_checkData(data, contract));
        return errors;
    }

    function _checkContract(data, contract, pathList) {
        var errors = [];
        for (var propName in contract) {
            if (contract.hasOwnProperty(propName)) {
                var contractInfo = {
                    name: propName,
                    descriptor: contract[propName]
                };
                if (!data.hasOwnProperty(propName)) {
                    errors.push(errorBuilder.propertyNotFound(propName, pathList.join(".")));
                }
                else {
                    var dataPropVal = data[propName];
                    if (typeof contractInfo.descriptor === "object") {
                        pathList.push(propName);
                        errors = errors.concat(_validateData(dataPropVal, contractInfo.descriptor, pathList));
                        pathList.pop();
                    }
                    else if (!contractInfo.descriptor(dataPropVal)) {
                        errors.push(errorBuilder.typeMismatch(propName, contractInfo.descriptor._name_, dataPropVal, pathList.join(".")));
                    }
                }
            }
        }
        return errors;
    }

    function _checkData(data, contract) {
        var errors = [];
        for (var propName in data) {
            if (data.hasOwnProperty(propName)) {
                if (!contract.hasOwnProperty(propName)) {
                    errors.push(errorBuilder.unexpectedProperty(propName));
                }
            }
        }
        return errors;
    }
})(DataContract.Types, DataContract.Errors);