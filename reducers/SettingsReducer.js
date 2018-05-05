import {
  SET_CARD,
  PAY
} from '../constants/Settings';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_CARD:
      return { ...state, card: action.payload };
    default:
      return state;
  }
};