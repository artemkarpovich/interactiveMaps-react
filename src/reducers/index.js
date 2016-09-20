import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import locationCategories from './locationCategories';
import locations from './locations';
import geolocation from './geolocation';
import itemCoordinates from './itemCoordinates';

export default combineReducers({
  routing: routerReducer,
  locationCategories,
  locations,
  geolocation,
  itemCoordinates,
});
