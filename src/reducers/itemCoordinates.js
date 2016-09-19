import { SET_ITEM_COORDINATES } from '../actions';

export default function (state = [null, null], action) {
  switch (action.type) {
    case SET_ITEM_COORDINATES:
      return action.payload.to;
    default:
      return state;
  }
}
