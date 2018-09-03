import Pusher from 'pusher-js';
import React, { Component } from 'react';
import { withContext } from 'recompose';

import logo from './logo.svg';
import './App.css';

import { CONTEXT_TYPES } from './constants';
import CountriesList from './CountriesList';
import MeasurementsByCity from './MeasurementsByCity';

// Enable pusher logging - don't include this in production
// Pusher.logToConsole = true;

const pusher = new Pusher('f9ec22c4400bb22d2aa4', {
  cluster: 'eu',
  encrypted: true
});

const channel = pusher.subscribe('pollution-development');

const config = {
  apiBaseUrl: 'http://localhost:4000/api',
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <CountriesList />
        <MeasurementsByCity />
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
