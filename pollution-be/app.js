const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const apicache = require('apicache');
const cors = require('cors');
const compression = require('compression');

const Pusher = require('pusher');
const pusher = new Pusher({
    appId: '586188',
    key: 'f9ec22c4400bb22d2aa4',
    secret: '1087142e11205cbdc5be',
    cluster: 'eu',
    encrypted: true
});

const NodeCache = require('node-cache');
const nodeCache = new NodeCache();

const indexRouter = require('./routes/index');

const app = express();

app.use(cors({
    methods: ['GET'],
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(apicache.middleware('1 day'));

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, '../pollution-pwa/build')));

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../pollution-pwa/build/index.html'));
// });

const cities = require('./cities');
const countries = require('./countries');
const latest = require('./latest');
const keys = require('./keys');

const args = { apicache, app, nodeCache, pusher };

cities(args);
countries(args);
latest(args);
keys(args);

module.exports = app;
