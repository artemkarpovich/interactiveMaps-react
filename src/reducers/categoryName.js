import { SAVE_CATEGORY_NAME } from '../actions';

export default function (state = 'Выберите категорию в меню', action) {
  switch (action.type) {
    case SAVE_CATEGORY_NAME:
      return action.payload.name;
    default:
      return state;
  }
}
