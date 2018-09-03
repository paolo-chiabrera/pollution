import { ACTION_TYPES } from './constants';

const measurementsByCity = (state = [], action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_MEASUREMENTS_BY_CITY:
            return action.payload;
        default:
            return state;
    }
};

export {
    measurementsByCity,
};
