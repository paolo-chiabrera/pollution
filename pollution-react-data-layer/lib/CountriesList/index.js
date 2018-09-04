'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _core = require('lodash/core');

var _recompose = require('recompose');

var _reactRedux = require('react-redux');

var _constants = require('../constants');

var _actions = require('./actions');

var _constants2 = require('./constants');

var mapStateToProps = function mapStateToProps(_ref) {
    var countries = _ref.countries,
        selectedCountry = _ref.selectedCountry;
    return {
        countries: countries,
        selectedCountry: selectedCountry
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onSelect: function onSelect(countryCode) {
            return dispatch((0, _actions.setSelectedCountry)(countryCode));
        },
        setCountries: function setCountries(countries) {
            return dispatch((0, _actions.setCountries)(countries));
        }
    };
};

exports.default = (0, _recompose.compose)((0, _recompose.getContext)(_constants.CONTEXT_TYPES), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _recompose.lifecycle)({
    componentDidMount: function componentDidMount() {
        var _props = this.props,
            axios = _props.axios,
            channel = _props.channel,
            setCountries = _props.setCountries;


        axios.get('/countries').then(function (_ref2) {
            var data = _ref2.data;
            return setCountries(data);
        });

        channel.bind(_constants2.EVENT_COUNTRIES, function (data) {
            return setCountries(data);
        });
    },
    componentDidUpdate: function componentDidUpdate(prevProps) {
        var _props2 = this.props,
            countries = _props2.countries,
            onSelect = _props2.onSelect,
            selectedCountry = _props2.selectedCountry;


        if ((0, _core.isArray)(countries) && !(0, _core.isEmpty)(countries) && (0, _core.isEmpty)(selectedCountry)) {
            onSelect(countries[0].code);
        }
    }
}));
//# sourceMappingURL=index.js.map