import React from 'react';
import ReactDOM from 'react-dom';
import Pusher from 'pusher-js';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

const pusher = new Pusher('f9ec22c4400bb22d2aa4', {
  cluster: 'eu',
  encrypted: true
});

const channel = pusher.subscribe('pollution');

channel.bind('country', (data) => {
  console.log('country', data);
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
