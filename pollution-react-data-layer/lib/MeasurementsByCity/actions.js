'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setMeasurementsByCity = undefined;

var _constants = require('./constants');

var setMeasurementsByCity = exports.setMeasurementsByCity = function setMeasurementsByCity(payload) {
    return {
        type: _constants.ACTION_TYPES.SET_MEASUREMENTS_BY_CITY,
        payload: payload
    };
};
//# sourceMappingURL=actions.js.map