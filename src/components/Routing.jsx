import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css';

export default class RoutingMachine extends MapLayer {
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

  render() {
    return null;
  }
}
