import React from 'react';
import ReactDOM from 'react-dom';

import milligram from 'milligram'; // eslint-disable-line no-unused-vars

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

registerServiceWorker();
