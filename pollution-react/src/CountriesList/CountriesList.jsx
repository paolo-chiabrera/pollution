import { noop } from 'lodash/core';
import PropTypes from 'prop-types';
import React from 'react';

const CountriesList = ({ countries, onSelect }) => (
    <div className="countries">
        <select id="countriesList" onChange={ev => onSelect(ev.target.value)}>
            {
                countries.map(({ code, name }) => (
                    <option key={`country_${code}`} value={code}>{name}</option>
                ))
            }
        </select>
    </div>
);

CountriesList.propTypes = {
    countries: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.string,
            name: PropTypes.string,
        }),
    ),
    onSelect: PropTypes.func,
};

CountriesList.defaultProps = {
    countries: [],
    onSelect: noop,
};

export default CountriesList;
