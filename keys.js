const { KEYS_PATH } = require('./constants');

const init = ({ app, nodeCache }) => {
    app.use(KEYS_PATH, (req, res) => {
        nodeCache.keys((err, keys) => {
            if (err) {
                res.status(500).json(err);
                return;
            }

            res.json(keys);
        });
    });
};

module.exports = init;
