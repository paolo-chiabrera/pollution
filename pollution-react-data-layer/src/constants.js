import PropTypes from 'prop-types';

export const CONTEXT_TYPES = {
    axios: PropTypes.func,
    channel: PropTypes.shape({
        bind: PropTypes.func,
    }),
};
