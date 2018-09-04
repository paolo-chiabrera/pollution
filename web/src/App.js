import Pusher from 'pusher-js';
import React, { Component } from 'react';
import { withContext } from 'recompose';

import logo from './logo.png';
import './App.css';

import { CONTEXT_TYPES } from './constants';
import CountriesList from './CountriesList';
import MeasurementsByCity from './MeasurementsByCity';

const {
  NODE_ENV,
  REACT_APP_PUSHER_APP_KEY,
} = process.env;

const pusher = new Pusher(REACT_APP_PUSHER_APP_KEY, {
  cluster: 'eu',
  encrypted: true
});

const channel = pusher.subscribe(`pollution-${NODE_ENV}`);

const config = {
  apiBaseUrl: '/api',
};

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default withContext(
  CONTEXT_TYPES,
  () => ({
    channel,
    config,
  }),
)(App);
