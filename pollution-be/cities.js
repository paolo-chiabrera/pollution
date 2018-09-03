const axios = require('axios');
const _ = require('lodash');

const {
    API_OPENAQ,
    CACHE_TTL_SEC,
    CITIES_KEY,
    CITIES_PATH,
    EVENT_CITIES,
    POLLUTION_CHANNEL,
} = require('./constants');

const getCities = ({ apicache, nodeCache, pusher }) => {
    axios.get(`${API_OPENAQ}/cities`)
        .then((res) => {
            const results = _.get(res, 'data.results');
            const cachedResults = nodeCache.get(CITIES_KEY);

            if (_.isArray(results) && !_.isEqual(results, cachedResults)) {
                nodeCache.set(CITIES_KEY, results, (err) => {
                    if (err) {
                        console.error(`SET ${CITIES_KEY} KO`, err);
                        return;
                    }

                    apicache.clear(CITIES_PATH);

                    pusher.trigger(POLLUTION_CHANNEL, EVENT_CITIES, results);

                    console.log(`SET ${CITIES_KEY} OK`);
                });
            }

        })
        .catch(err => console.error('GET /cities', err));
};

const init = ({ apicache, app, nodeCache, pusher }) => {
    const args = { apicache, nodeCache, pusher };

    getCities(args);

    setInterval(() => {
        getCities(args);
    }, CACHE_TTL_SEC * 1000);

    app.use(CITIES_PATH, (req, res) => {
        nodeCache.get(CITIES_KEY, (err, data) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
    
            res.json(data);
        });
    });
};

module.exports = init;
