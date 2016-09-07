import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import locationCategories from './locationCategories';

export default combineReducers({
  routing: routerReducer,
  locationCategories,
});
