const axios = require('axios');
const _ = require('lodash');

const {
    API_OPENAQ,
    CACHE_TTL_SEC,
    COUNTRIES_KEY,
    COUNTRIES_PATH,
    EVENT_COUNTRIES,
    POLLUTION_CHANNEL,
} = require('./constants');

const getCities = ({ apicache, nodeCache, pusher }) => {
    axios.get(`${API_OPENAQ}/countries`)
        .then((res) => {
            const results = _.get(res, 'data.results');
            const cachedResults = nodeCache.get(COUNTRIES_KEY);

            if (_.isArray(results) && !_.isEqual(results, cachedResults)) {
                nodeCache.set(COUNTRIES_KEY, results, (err) => {
                    if (err) {
                        console.error(`SET ${COUNTRIES_KEY} KO`, err);
                        return;
                    }

                    apicache.clear(COUNTRIES_PATH);

                    pusher.trigger(POLLUTION_CHANNEL, EVENT_COUNTRIES, results);

                    console.log(`SET ${COUNTRIES_KEY} OK`);
                });
            }

        })
        .catch(err => console.error('GET /countries', err));
};

const init = ({ apicache, app, nodeCache, pusher }) => {
    const args = { apicache, nodeCache, pusher };

    getCities(args);

    setInterval(() => {
        getCities(args);
    }, CACHE_TTL_SEC * 1000);

    app.use(COUNTRIES_PATH, (req, res) => {
        nodeCache.get(COUNTRIES_KEY, (err, data) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
    
            res.json(data);
        });
    });
};

module.exports = init;
