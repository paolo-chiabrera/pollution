import axios from 'axios';
import React from 'react';
import { Provider } from 'react-redux';
import { withContext } from 'recompose';
import { applyMiddleware, compose, createStore } from 'redux';

import { CONTEXT_TYPES } from './constants';
import reducers from './reducers';

import enhanceCountriesList from './CountriesList';
import enhanceMeasurementsByCity from './MeasurementsByCity';

const {
    NODE_ENV,
} = process.env;

// setup Logger
const middlewares = [];

if (NODE_ENV === 'development') {
  const { logger } = require('redux-logger');

  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(reducers);

const DataLayer = ({ children }) => (
    <Provider store={store}>
        { children }
    </Provider>
);

const DataLayerProvider = withContext(
    CONTEXT_TYPES,
    ({ config, deps }) => {
        const { pusher } = deps;

        const channel = pusher.subscribe(`pollution-${NODE_ENV}`);

        return {
            axios: axios.create(config.axios),
            channel,
        };
    },
)(DataLayer);

export { 
    DataLayerProvider,
    enhanceCountriesList,
    enhanceMeasurementsByCity,
};
