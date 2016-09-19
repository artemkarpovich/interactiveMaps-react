import React, { PropTypes } from 'react';
import { Popup, Marker } from 'react-leaflet';

function Markers({ locations, countKeyInUserPosition, getDirection }) {
  return (
    <div>
      {
        locations.length > 0 ?
          locations.map(location =>
            <Marker
              position={[location.coordinates.lat, location.coordinates.lon]}
              key={location.id}
            >
              <Popup>
                <span>
                  {location.name}<br />
                  {location.description}<br />
                  {location.address}<br />
                  {
                    countKeyInUserPosition > 0 ?
                      <button
                        onClick={() => getDirection(
                          [location.coordinates.lat, location.coordinates.lon]
                        )}
                      >
                        Get direction
                      </button> : null
                  }
                </span>
              </Popup>
            </Marker>
          ) : null
      }
    </div>
  );
}

Markers.propTypes = {
  locations: PropTypes.array,
  countKeyInUserPosition: PropTypes.number,
  getDirection: PropTypes.func,
};

export default Markers;
