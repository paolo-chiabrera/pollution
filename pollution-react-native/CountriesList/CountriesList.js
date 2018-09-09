import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';

const CountriesList = ({ countries, onSelect }) => (
    <View>
        {
            countries.map(({ code, name }) => (
                <Text key={`country_${code}`}>{name}</Text>
            ))
        }
    </View>
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
    onSelect: () => {},
};

export default CountriesList;
