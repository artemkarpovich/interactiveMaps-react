import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import locationCategories from './locationCategories';
import locations from './locations';
import geolocation from './geolocation';

export default combineReducers({
  routing: routerReducer,
  locationCategories,
  locations,
  geolocation,
});
