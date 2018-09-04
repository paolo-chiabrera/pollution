import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { applyMiddleware, compose, createStore } from 'redux';
import milligram from 'milligram'; // eslint-disable-line no-unused-vars

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import reducers from './reducers';

// const middlewares = [];

// if (process.env.NODE_ENV === 'development') {
//   const { logger } = require('redux-logger');

//   middlewares.push(logger);
// }

// const store = compose(applyMiddleware(...middlewares))(createStore)(reducers);

ReactDOM.render(
  // <Provider store={store}>
    <App />
  // </Provider>,
  ,
  document.getElementById('root')
);

registerServiceWorker();
