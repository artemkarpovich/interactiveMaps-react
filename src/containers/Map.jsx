import React, { Component } from 'react';
import { Map, Popup, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default class MapExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 53.674237,
      lng: 23.825132,
      zoom: 13,
    };
  }

  render() {
    const { locations } = this.props;
    console.log(locations, 'locations');
    return (
      <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={[this.state.lat, this.state.lng]}>
          <Popup>
            <span>A pretty CSS3 popup.<br /> Easily customizable. </span>
          </Popup>
        </Marker>
      </Map>
    );
  }
}
