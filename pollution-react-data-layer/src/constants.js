import PropTypes from 'prop-types';

const {
    NODE_ENV,
} = process.env;

export const AXIOS_CONFIG = {
    baseURL: `${NODE_ENV === 'development' ? '' : 'https://pc-pollution.herokuapp.com'}/api/`,
};

export const CONTEXT_TYPES = {
    axios: PropTypes.func,
    channel: PropTypes.shape({
        bind: PropTypes.func,
    }),
};
