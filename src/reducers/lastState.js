import { SAVE_LAST_STATE } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case SAVE_LAST_STATE:
      return action.payload;
    default:
      return state;
  }
}
