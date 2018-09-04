'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CONTEXT_TYPES = exports.AXIOS_CONFIG = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NODE_ENV = process.env.NODE_ENV;
var AXIOS_CONFIG = exports.AXIOS_CONFIG = {
    baseURL: (NODE_ENV === 'development' ? '' : 'https://pc-pollution.herokuapp.com') + '/api/'
};

var CONTEXT_TYPES = exports.CONTEXT_TYPES = {
    axios: _propTypes2.default.func,
    channel: _propTypes2.default.shape({
        bind: _propTypes2.default.func
    })
};
//# sourceMappingURL=constants.js.map