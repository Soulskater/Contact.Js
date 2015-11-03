var DataContract = DataContract || {};

DataContract.Types = (function () {

    _string._name_ = "string";
    _int._name_ = "int";
    _float._name_ = "float";
    _bool._name_ = "bool";

    return {
        string: _string,
        int: _int,
        float: _float,
        bool: _bool,
        getTypeByName: function (name) {
            switch (name) {
                case _string._name_:
                    return _string._name_;
                    break;
                case _int._name_:
                    return _int._name_;
                    break;
                case _float._name_:
                    return _float._name_;
                    break;
                case _bool._name_:
                    return _bool._name_;
                    break;
                default :
                    return null;
            }
        }
    };

    function _string(val) {
        return typeof val === "string";
    }

    function _int(val) {
        return typeof val === "number" && val % 1 === 0;
    }

    function _float(val) {
        return typeof val === "number";
    }

    function _bool(val) {
        return typeof val === "boolean";
    }
})();