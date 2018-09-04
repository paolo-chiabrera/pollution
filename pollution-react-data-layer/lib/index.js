'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.enhanceMeasurementsByCity = exports.enhanceCountriesList = exports.DataLayerProvider = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _pusherJs = require('pusher-js');

var _pusherJs2 = _interopRequireDefault(_pusherJs);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _recompose = require('recompose');

var _redux = require('redux');

var _constants = require('./constants');

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _CountriesList = require('./CountriesList');

var _CountriesList2 = _interopRequireDefault(_CountriesList);

var _MeasurementsByCity = require('./MeasurementsByCity');

var _MeasurementsByCity2 = _interopRequireDefault(_MeasurementsByCity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env = process.env,
    NODE_ENV = _process$env.NODE_ENV,
    REACT_APP_PUSHER_APP_KEY = _process$env.REACT_APP_PUSHER_APP_KEY;

// setup Logger

var middlewares = [];

if (NODE_ENV === 'development') {
    var _require = require('redux-logger'),
        logger = _require.logger;

    middlewares.push(logger);
}

var store = (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, middlewares))(_redux.createStore)(_reducers2.default);

// setup Pusher
var pusher = new _pusherJs2.default(REACT_APP_PUSHER_APP_KEY, {
    cluster: 'eu',
    encrypted: true
});

var channel = pusher.subscribe('pollution-' + NODE_ENV);

var DataLayer = function DataLayer(_ref) {
    var children = _ref.children;
    return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        children
    );
};

var DataLayerProvider = (0, _recompose.withContext)(_constants.CONTEXT_TYPES, function () {
    return {
        axios: _axios2.default.create(_constants.AXIOS_CONFIG),
        channel: channel
    };
})(DataLayer);

exports.DataLayerProvider = DataLayerProvider;
exports.enhanceCountriesList = _CountriesList2.default;
exports.enhanceMeasurementsByCity = _MeasurementsByCity2.default;
//# sourceMappingURL=index.js.map