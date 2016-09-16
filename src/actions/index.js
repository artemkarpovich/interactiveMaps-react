export const GET_LOCATION_CATEGORIES = 'GET_LOCATION_CATEGORIES';
export const GET_LOCATIONS_BY_CATEGORY = 'GET_LOCATIONS_BY_CATEGORY';
export const ADD_USER_POSITION = 'ADD_USER_POSITION';
export const RECORD_ERROR = 'RECORD_ERROR';
export const CLOSE_MODAL_WINDOW = 'CLOSE_MODAL_WINDOW';
export const SAVE_LAST_STATE = 'SAVE_LAST_STATE';

export function getLocationCategories() {
  return {
    type: GET_LOCATION_CATEGORIES,
    payload: {
      url: '/info/location-categories',
    },
  };
}

export function getLocationsByCategory(categoryName) {
  return {
    type: GET_LOCATIONS_BY_CATEGORY,
    payload: {
      url: '/info/locations',
      method: 'post',
      body: { categoryName },
    },
  };
}

export function addUserPosition(coordinates) {
  return {
    type: ADD_USER_POSITION,
    payload: {
      coordinates,
    },
  };
}

export function recordError(error) {
  return {
    type: RECORD_ERROR,
    payload: {
      error,
    },
  };
}

export function closeModalWindow() {
  return {
    type: CLOSE_MODAL_WINDOW,
    payload: {},
  };
}

export function saveLastState(data) {
  return {
    type: SAVE_LAST_STATE,
    payload: {
      data,
    },
  };
}
