import React from 'react';
import { DataLayerProvider } from 'pollution-react-data-layer';
import Pusher from 'pusher-js';

import logo from './logo.png';
import './App.css';

import CountriesList from './CountriesList';
import MeasurementsByCity from './MeasurementsByCity';

const {
  REACT_APP_AXIOS_BASE_URL,
  REACT_APP_PUSHER_APP_KEY,
} = process.env;

const config = {
  axios: {
    baseURL: REACT_APP_AXIOS_BASE_URL,
  },
};

const deps = {
  pusher: new Pusher(REACT_APP_PUSHER_APP_KEY, {
    cluster: 'eu',
    encrypted: true
  }),
};

const App = () => (
  <DataLayerProvider config={config} deps={deps}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Pollution</h1>
      </header>
      <div className="container">
        <div className="row">
          <div className="column"><CountriesList /></div>
        </div>
        <div className="row">
          <div className="column"><MeasurementsByCity /></div>
        </div>
      </div>
    </div>
  </DataLayerProvider>
);

export default App;
