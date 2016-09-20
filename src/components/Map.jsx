import React, { PropTypes, Component } from 'react';
import { Map, Popup, Marker, TileLayer, CircleMarker, ZoomControl } from 'react-leaflet';
import 'leaflet-routing-machine';
import Routing from './Routing';
import Markers from './Markers';
import '../../node_modules/leaflet/dist/leaflet.css';

class MapLeafLet extends Component {
  constructor(props) {
    super(props);

    this.getDirection = this.getDirection.bind(this);
  }

  getDirection(to) {
    const mapLeaflet = this.mapLeaflet;

    this.props.setItemCoordinates(to);

    window.localStorage.removeItem('lastState');

    mapLeaflet.leafletElement.closePopup();
  }

  render() {
    const { userPosition, locations, itemCoordinates } = this.props;
    const lastState = JSON.parse(window.localStorage.getItem('lastState'));

    let countKeyInUserPosition = 0;

    for (const key in userPosition) { // eslint-disable-line no-unused-vars
      countKeyInUserPosition++;
    }

    return (
      <Map
        center={
          countKeyInUserPosition > 0 ?
          [userPosition.latitude, userPosition.longitude] :
          [53.674237, 23.825132]
        }
        zoom={13}
        ref={(c) => { this.mapLeaflet = c; }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomleft" />
        {
          countKeyInUserPosition > 0 ?
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
          countKeyInUserPosition > 0 ?
            <CircleMarker center={[userPosition.latitude, userPosition.longitude]} radius={25} />
          : null
        }
        {
          lastState && lastState.locations.length > 0 ?
            <Markers
              locations={lastState.locations}
              countKeyInUserPosition={countKeyInUserPosition}
              getDirection={this.getDirection}
            /> :
          <Markers
            locations={locations}
            countKeyInUserPosition={countKeyInUserPosition}
            getDirection={this.getDirection}
          />
        }
        {
          countKeyInUserPosition > 0 &&
          lastState &&
          lastState.itemCoordinates[0] !== null &&
          lastState.itemCoordinates[1] !== null ?
            <Routing
              from={[userPosition.latitude, userPosition.longitude]}
              to={[lastState.itemCoordinates[0], lastState.itemCoordinates[1]]}
            /> :
          countKeyInUserPosition > 0 && itemCoordinates[0] !== 0 && itemCoordinates[1] !== 0 ?
            <Routing
              from={[userPosition.latitude, userPosition.longitude]}
              to={[itemCoordinates[0], itemCoordinates[1]]}
            /> :
          null
        }
      </Map>
    );
  }
}

MapLeafLet.propTypes = {
  locations: PropTypes.array,
  userPosition: PropTypes.object,
  setItemCoordinates: PropTypes.func,
  itemCoordinates: PropTypes.array,
};

export default MapLeafLet;
