const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const apicache = require('apicache');
const cors = require('cors');
const compression = require('compression');

require('dotenv').config();

const {
    PUSHER_APP_ID,
    PUSHER_APP_KEY,
    PUSHER_APP_SECRET,
} = process.env;

const Pusher = require('pusher');
const pusher = new Pusher({
    appId: PUSHER_APP_ID,
    key: PUSHER_APP_KEY,
    secret: PUSHER_APP_SECRET,
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
app.use(express.static(path.resolve(__dirname, './web/build')));

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
