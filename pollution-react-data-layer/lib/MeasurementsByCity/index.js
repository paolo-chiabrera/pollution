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
    var measurementsByCity = _ref.measurementsByCity,
        selectedCountry = _ref.selectedCountry;
    return {
        measurementsByCity: measurementsByCity,
        selectedCountry: selectedCountry
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        setMeasurementsByCity: function setMeasurementsByCity(payload) {
            return dispatch((0, _actions.setMeasurementsByCity)(payload));
        }
    };
};

var getLatestMeasurements = function getLatestMeasurements(_ref2) {
    var axios = _ref2.axios,
        selectedCountry = _ref2.selectedCountry,
        setMeasurementsByCity = _ref2.setMeasurementsByCity;

    return axios.get('/latest', {
        params: {
            country: selectedCountry
        }
    }).then(function (_ref3) {
        var data = _ref3.data;
        return setMeasurementsByCity(data);
    });
};

exports.default = (0, _recompose.compose)((0, _recompose.getContext)(_constants.CONTEXT_TYPES), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _recompose.branch)(function (_ref4) {
    var selectedCountry = _ref4.selectedCountry;
    return !(0, _core.isString)(selectedCountry) || (0, _core.isEmpty)(selectedCountry);
}, _recompose.renderNothing), (0, _recompose.lifecycle)({
    componentDidMount: function componentDidMount() {
        var _props = this.props,
            axios = _props.axios,
            channel = _props.channel,
            selectedCountry = _props.selectedCountry,
            setMeasurementsByCity = _props.setMeasurementsByCity;


        getLatestMeasurements({ axios: axios, selectedCountry: selectedCountry, setMeasurementsByCity: setMeasurementsByCity });

        channel.bind(_constants2.EVENT_LATEST + '-' + selectedCountry, function (data) {
            return setMeasurementsByCity(data);
        });
    },
    componentDidUpdate: function componentDidUpdate(prevProps) {
        var _props2 = this.props,
            axios = _props2.axios,
            channel = _props2.channel,
            selectedCountry = _props2.selectedCountry,
            setMeasurementsByCity = _props2.setMeasurementsByCity;


        if (selectedCountry !== prevProps.selectedCountry) {
            getLatestMeasurements({ axios: axios, selectedCountry: selectedCountry, setMeasurementsByCity: setMeasurementsByCity });

            channel.unbind(_constants2.EVENT_LATEST + '-' + prevProps.selectedCountry);
            channel.bind(_constants2.EVENT_LATEST + '-' + selectedCountry, function (data) {
                return setMeasurementsByCity(data);
            });
        }
    },
    componentWillUnmount: function componentWillUnmount() {
        var _props3 = this.props,
            channel = _props3.channel,
            selectedCountry = _props3.selectedCountry;


        channel.unbind(_constants2.EVENT_LATEST + '-' + selectedCountry);
    }
}));
//# sourceMappingURL=index.js.map