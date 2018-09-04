'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.selectedCountry = exports.countries = undefined;

var _constants = require('./constants');

var countries = function countries() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case _constants.ACTION_TYPES.SET_COUNTRIES:
            return action.payload;
        default:
            return state;
    }
};

var selectedCountry = function selectedCountry() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var action = arguments[1];

    switch (action.type) {
        case _constants.ACTION_TYPES.SET_SELECTED_COUNTRY:
            return action.payload;
        default:
            return state;
    }
};

exports.countries = countries;
exports.selectedCountry = selectedCountry;
//# sourceMappingURL=reducers.js.map