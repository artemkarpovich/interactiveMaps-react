export const GET_LOCATION_CATEGORIES = 'GET_LOCATION_CATEGORIES';
export const GET_LOCATIONS_BY_CATEGORY = 'GET_LOCATIONS_BY_CATEGORY';
export const ADD_COORDINATES_CATEGORY_ITEM = 'ADD_COORDINATES_CATEGORY_ITEM';

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

export function addCoordinatesCategoryItem(coordinates) {
  return {
    type: ADD_COORDINATES_CATEGORY_ITEM,
    payload: {
      coordinates,
    },
  };
}
