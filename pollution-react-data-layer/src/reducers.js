import { combineReducers } from 'redux';

import {
    countries,
    selectedCountry,
} from './CountriesList/reducers';
import {
    measurementsByCity
} from './MeasurementsByCity/reducers';

export default combineReducers({
    countries,
    measurementsByCity,
    selectedCountry,
});
