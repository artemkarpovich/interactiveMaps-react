import React, { PropTypes, Component } from 'react';
import { Map, Popup, Marker, TileLayer, CircleMarker } from 'react-leaflet';
import 'leaflet-routing-machine';
import Routing from './Routing';
import '../../node_modules/leaflet/dist/leaflet.css';

class MapLeafLet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toLat: null,
      toLon: null,
    };
  }

  getDirection(to) {
    this.setState({
      toLat: to[0],
      toLon: to[1],
    });
  }

  render() {
    const { userPosition, locations } = this.props;

    return (
      <Map center={[53.674237, 23.825132]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {
          typeof (userPosition) === 'object' ?
            <Marker position={[userPosition.latitude, userPosition.longitude]}>
              <Popup>
                <span>
                  Your position: <br />
                  latitude - {userPosition.latitude}<br />
                  longitude - {userPosition.longitude}
                </span>
              </Popup>
            </Marker> : null
        }
        {
          typeof (userPosition) === 'object' ?
            <CircleMarker center={[userPosition.latitude, userPosition.longitude]} radius={25} />
            : null
        }
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
                    <button
                      onClick={() => this.getDirection(
                        [location.coordinates.lat, location.coordinates.lon]
                      )}
                    >
                      Get direction
                    </button>
                  </span>
                </Popup>
              </Marker>
            ) : null
        }
        {
          this.state.toLat !== null ?
            <Routing
              from={[userPosition.latitude, userPosition.longitude]}
              to={[this.state.toLat, this.state.toLon]}
            /> :
            null
        }

      </Map>
    );
  }
}

const propTypes = {
  locations: PropTypes.array,
  userPosition: PropTypes.object,
  getDirection: PropTypes.func,
};

MapLeafLet.propTypes = propTypes;

export default MapLeafLet;
