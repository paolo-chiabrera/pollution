'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.measurementsByCity = undefined;

var _constants = require('./constants');

var measurementsByCity = function measurementsByCity() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case _constants.ACTION_TYPES.SET_MEASUREMENTS_BY_CITY:
            return action.payload;
        default:
            return state;
    }
};

exports.measurementsByCity = measurementsByCity;
//# sourceMappingURL=reducers.js.map