import { PropTypes } from 'react';
import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css';

class RoutingMachine extends MapLayer {
  componentWillMount() {
    super.componentWillMount();
    const { map, from, to } = this.props;

    this.leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(from[0], from[1]),
        L.latLng(to[0], to[1]),
      ],
    }).addTo(map);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.to[0] !== nextProps.to[0] && this.props.to[1] !== nextProps.to[1]) {
      this.leafletElement.setWaypoints([]);

      this.leafletElement = L.Routing.control({
        waypoints: [
          L.latLng(nextProps.from[0], nextProps.from[1]),
          L.latLng(nextProps.to[0], nextProps.to[1]),
        ],
      }).addTo(nextProps.map);
    }
  }

  render() {
    return null;
  }
}

RoutingMachine.propTypes = {
  map: PropTypes.object,
  from: PropTypes.array,
  to: PropTypes.array,
};

export default RoutingMachine;
