import PropTypes from 'prop-types';
import React from 'react';

const Measurement = ({ data }) => (
    <pre>
        <code>{JSON.stringify(data, null, 4)}</code>
    </pre>
);

const MeasurementsByCity = ({ measurementsByCity }) => (
    <div className="measurements">
        <dl>
            { 
                measurementsByCity.map(({ city, location, measurements }) => (
                    <div key={location} style={{ textAlign: 'left' }}>
                        <dt>{decodeURIComponent(city)} - {decodeURIComponent(location)}</dt>
                        <dd>
                            { measurements.map((data, ind) => <Measurement data={data} key={`${data.parameter}_${data.sourceName}_${ind}`} />)}
                        </dd>
                    </div>
                )) 
            }
        </dl>
    </div>
);

MeasurementsByCity.propTypes = {
    measurementsByCity: PropTypes.arrayOf(
        PropTypes.shape({}),
    ),
};

MeasurementsByCity.defaultProps = {
    measurementsByCity: [],
};

export default MeasurementsByCity;
