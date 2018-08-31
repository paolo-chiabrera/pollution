const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const axios = require('axios');
const _ = require('lodash');
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '586188',
    key: 'f9ec22c4400bb22d2aa4',
    secret: '1087142e11205cbdc5be',
    cluster: 'eu',
    encrypted: true
});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const API_URL_LATEST = 'https://api.openaq.org/v1/latest';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

let lastHash = '';

function getMeasurementsLastUpdated(measurements = []) {
    return _.chain(measurements)
        .sortedUniqBy(item => item.lastUpdated)
        .last()
        .get('lastUpdated')
        .thru(lastUpdated => (new Date(lastUpdated)).getTime())
        .value();
}

function getHash(results = []) {
    return results
        .map(item => `${item.location}_${getMeasurementsLastUpdated(item.measurements)}`)
        .join('-');
}

const getLatestResults = () => {
    axios.get(API_URL_LATEST)
    .then(res => {
        const results = _.get(res, 'data.results', []);

        const currentHash = getHash(results);

        if (currentHash !== lastHash) {
            lastHash = currentHash;

            _.chain(results).groupBy('country').forEach((results, country) => {
                pusher.trigger('pollution', 'country', {
                    country,
                    results,
                });
            }).value();
        }
    });
};

getLatestResults();

setInterval(() => {
    getLatestResults();
}, 30 * 1000);

module.exports = app;
