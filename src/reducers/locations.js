import { GET_LOCATIONS_BY_CATEGORY } from '../actions/index';

const initialState = {
  isFetching: false,
  items: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case `${GET_LOCATIONS_BY_CATEGORY}_SUCCESS`:
      return {
        items: [
          ...action.payload,
        ],
        isFetching: true,
      };
    default:
      return state;
  }
}
