'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setSelectedCountry = exports.setCountries = undefined;

var _constants = require('./constants');

var setCountries = exports.setCountries = function setCountries(countries) {
    return {
        type: _constants.ACTION_TYPES.SET_COUNTRIES,
        payload: countries
    };
};

var setSelectedCountry = exports.setSelectedCountry = function setSelectedCountry(countryCode) {
    return {
        type: _constants.ACTION_TYPES.SET_SELECTED_COUNTRY,
        payload: countryCode
    };
};
//# sourceMappingURL=actions.js.map