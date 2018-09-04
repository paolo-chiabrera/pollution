'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _reducers = require('./CountriesList/reducers');

var _reducers2 = require('./MeasurementsByCity/reducers');

exports.default = (0, _redux.combineReducers)({
    countries: _reducers.countries,
    measurementsByCity: _reducers2.measurementsByCity,
    selectedCountry: _reducers.selectedCountry
});
//# sourceMappingURL=reducers.js.map