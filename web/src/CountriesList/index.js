import axios from 'axios';
import { isArray, isEmpty } from 'lodash/core';
import { compose, getContext, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import { CONTEXT_TYPES } from '../constants';

import { setCountries, setSelectedCountry } from './actions';
import { EVENT_COUNTRIES } from './constants';

import CountriesList from './CountriesList.jsx';

const mapStateToProps = ({ countries, selectedCountry }) => ({
    countries,
    selectedCountry,
});

const mapDispatchToProps = dispatch => ({
    onSelect: countryCode => dispatch(setSelectedCountry(countryCode)),
    setCountries: countries => dispatch(setCountries(countries)),
});

export default compose(
    getContext(CONTEXT_TYPES),
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const { channel, config, setCountries } = this.props;

            axios
                .get(`${config.apiBaseUrl}/countries`)
                .then(({ data }) => setCountries(data));

            channel.bind(EVENT_COUNTRIES, data => setCountries(data));
        },
        componentDidUpdate(prevProps) {
            const { countries, onSelect, selectedCountry } = this.props;

            if (isArray(countries) && !isEmpty(countries) && isEmpty(selectedCountry)) {
                onSelect(countries[0].code);
            }
        },
    })
)(CountriesList);

export { CountriesList };
