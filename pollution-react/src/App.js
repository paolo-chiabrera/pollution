import React from 'react';
import { DataLayerProvider } from 'pollution-react-data-layer';

import logo from './logo.png';
import './App.css';

import CountriesList from './CountriesList';
import MeasurementsByCity from './MeasurementsByCity';

const App = () => (
  <DataLayerProvider>
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
