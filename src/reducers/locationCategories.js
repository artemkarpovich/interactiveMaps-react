import { GET_LOCATION_CATEGORIES } from '../actions';

const initialState = {
  isFetching: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case `${GET_LOCATION_CATEGORIES}_SUCCESS`:
      return {
        categories: [
          ...action.payload,
        ],
        isFetching: true,
      };
    default:
      return state;
  }
}
