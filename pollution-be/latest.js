const async = require('async');
const axios = require('axios');
const _ = require('lodash');
const os = require('os');

const {
    API_OPENAQ,
    CACHE_TTL_SEC,
    COUNTRIES_KEY,
    EVENT_LATEST,
    LATEST_KEY,
    LATEST_PATH,
    POLLUTION_CHANNEL,
} = require('./constants');

const getLatestByCountry = ({ apicache, country, nodeCache, pusher }, done) => {
    const EVENT_LATEST_COUNTRY = `${EVENT_LATEST}-${country}`;
    const LATEST_KEY_COUNTRY = `${LATEST_KEY}_${country}`;
    const LATEST_PATH_COUNTRY = `${LATEST_PATH}_${country}`;

    axios.get(`${API_OPENAQ}/latest`, {
        params: {
            country,
        },
    })
        .then((res) => {
            const results = _.get(res, 'data.results');
            const cachedResults = nodeCache.get(LATEST_KEY_COUNTRY);

            if (_.isArray(results) && !_.isEqual(results, cachedResults)) {
                nodeCache.set(LATEST_KEY_COUNTRY, results, (err) => {
                    if (err) {
                        console.error(`SET ${LATEST_KEY_COUNTRY}`, err);
                        done();
                        return;
                    }

                    apicache.clear(LATEST_PATH_COUNTRY);

                    pusher.trigger(POLLUTION_CHANNEL, EVENT_LATEST_COUNTRY, results);

                    console.log(`SET ${LATEST_KEY_COUNTRY} OK`);

                    done();
                });
            }

        })
        .catch(err => {
            console.error(`GET /latest ${country}`, err);
            done();
        });
};

const getLatest = ({ apicache, countries, nodeCache, pusher }) => {
    console.log(`Total countries: ${_.size(countries)}`);

    async.eachLimit(countries, _.size(os.cpus()), (item, next) => getLatestByCountry({
        apicache,
        country: item.code,
        nodeCache,
        pusher,
    }, next), err => {
        if (err) {
            console.error('ALL latest KO', err);
            return;
        }

        console.log('ALL latest OK');
    });
};

const init = ({ apicache, app, nodeCache, pusher }) => {
    const DEFERRED_MS = 5000;

    setTimeout(() => {
        const countries = nodeCache.get(COUNTRIES_KEY) || [];
        const sortedCountries = _.sortBy(countries, 'code');
        const args = {
            apicache,
            countries: sortedCountries,
            nodeCache,
            pusher,
        };

        getLatest(args);

        setInterval(() => {
            getLatest(args);
        }, CACHE_TTL_SEC * 1000);

        app.use(`${LATEST_PATH}`, (req, res) => {
            const { country } = req.query;

            nodeCache.get(`${LATEST_KEY}_${country}`, (err, data) => {
                if (err) {
                    res.status(500).json(err);
                    return;
                }
        
                res.json(data);
            });
        });
    }, DEFERRED_MS);
};

module.exports = init;
