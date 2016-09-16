import { ADD_USER_POSITION, RECORD_ERROR, CLOSE_MODAL_WINDOW } from '../actions';

const initialState = {
  openModal: false,
  errorMessage: ' ',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_USER_POSITION:
      return {
        openModal: false,
        errorMessage: ' ',
        userPosition: action.payload.coordinates,
      };
    case RECORD_ERROR:
      return {
        errorMessage: action.payload.error.message,
        openModal: true,
      };
    case CLOSE_MODAL_WINDOW:
      return {
        openModal: false,
      };
    default:
      return state;
  }
}
