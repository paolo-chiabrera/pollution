import { isEmpty, isString } from 'lodash/core';
import { branch, compose, getContext, lifecycle, renderNothing } from 'recompose';
import { connect } from 'react-redux';

import { CONTEXT_TYPES } from '../constants';

import { setMeasurementsByCity } from './actions';
import { EVENT_LATEST } from './constants';

const mapStateToProps = ({ measurementsByCity, selectedCountry }) => ({
    measurementsByCity,
    selectedCountry,
});

const mapDispatchToProps = dispatch => ({
    setMeasurementsByCity: payload => dispatch(setMeasurementsByCity(payload)),
});

const getLatestMeasurements = ({ axios, selectedCountry, setMeasurementsByCity }) => {
    return axios
        .get('/latest', {
            params: {
                country: selectedCountry,
            },
        })
        .then(({ data }) => setMeasurementsByCity(data));
};

export default compose(
    getContext(CONTEXT_TYPES),
    connect(mapStateToProps, mapDispatchToProps),
    branch(
        ({ selectedCountry }) => !isString(selectedCountry) || isEmpty(selectedCountry),
        renderNothing,
    ),
    lifecycle({
        componentDidMount() {
            const { axios, channel, selectedCountry, setMeasurementsByCity } = this.props;

            getLatestMeasurements({ axios, selectedCountry, setMeasurementsByCity });

            channel.bind(`${EVENT_LATEST}-${selectedCountry}`, data => setMeasurementsByCity(data));
        },
        componentDidUpdate(prevProps) {
            const { axios, channel, selectedCountry, setMeasurementsByCity } = this.props;

            if (selectedCountry !== prevProps.selectedCountry) {
                getLatestMeasurements({ axios, selectedCountry, setMeasurementsByCity });

                channel.unbind(`${EVENT_LATEST}-${prevProps.selectedCountry}`);
                channel.bind(`${EVENT_LATEST}-${selectedCountry}`, data => setMeasurementsByCity(data));
            }
        },
        componentWillUnmount() {
            const { channel, selectedCountry } = this.props;

            channel.unbind(`${EVENT_LATEST}-${selectedCountry}`);
        }
    })
);
