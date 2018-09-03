import PropTypes from 'prop-types';

export const CONTEXT_TYPES = {
    channel: PropTypes.shape({
        bind: PropTypes.func,
    }),
    config: PropTypes.shape({
        apiBaseUrl: PropTypes.string,
    }),
};
