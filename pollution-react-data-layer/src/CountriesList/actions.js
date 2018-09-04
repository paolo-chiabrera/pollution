import { ACTION_TYPES } from './constants';

export const setCountries = countries => ({
    type: ACTION_TYPES.SET_COUNTRIES,
    payload: countries,
});

export const setSelectedCountry = countryCode => ({
    type: ACTION_TYPES.SET_SELECTED_COUNTRY,
    payload: countryCode,
});
