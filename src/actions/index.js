export const GET_LOCATION_CATEGORIES = 'GET_LOCATION_CATEGORIES';

export function getLocationCategories() {
  return {
    type: GET_LOCATION_CATEGORIES,
    payload: {
      url: '/info/location-categories',
    },
  };
}
