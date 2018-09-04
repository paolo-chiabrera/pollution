import { ACTION_TYPES } from './constants';

const countries = (state = [], action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_COUNTRIES:
            return action.payload;
        default:
            return state;
    }
};

const selectedCountry = (state = '', action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_SELECTED_COUNTRY:
            return action.payload;
        default:
            return state;
    }
};

export {
    countries,
    selectedCountry,
};
