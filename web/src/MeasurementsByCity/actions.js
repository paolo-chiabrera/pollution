import { ACTION_TYPES } from './constants';

export const setMeasurementsByCity = payload => ({
    type: ACTION_TYPES.SET_MEASUREMENTS_BY_CITY,
    payload,
});
