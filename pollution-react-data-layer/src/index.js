import axios from 'axios';
import Pusher from 'pusher-js';
import React from 'react';
import { Provider } from 'react-redux';
import { withContext } from 'recompose';
import { applyMiddleware, compose, createStore } from 'redux';

import { AXIOS_CONFIG, CONTEXT_TYPES } from './constants';
import reducers from './reducers';

import enhanceCountriesList from './CountriesList';
import enhanceMeasurementsByCity from './MeasurementsByCity';

const {
    NODE_ENV,
    REACT_APP_PUSHER_APP_KEY,
} = process.env;

// setup Logger
const middlewares = [];

if (NODE_ENV === 'development') {
  const { logger } = require('redux-logger');

  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(reducers);

// setup Pusher
const pusher = new Pusher(REACT_APP_PUSHER_APP_KEY, {
    cluster: 'eu',
    encrypted: true
});
  
const channel = pusher.subscribe(`pollution-${NODE_ENV}`);

const DataLayer = ({ children }) => (
    <Provider store={store}>
        { children }
    </Provider>
);

const DataLayerProvider = withContext(
    CONTEXT_TYPES,
    () => ({
        axios: axios.create(AXIOS_CONFIG),
        channel,
    }),
)(DataLayer);

export { 
    DataLayerProvider,
    enhanceCountriesList,
    enhanceMeasurementsByCity,
};
