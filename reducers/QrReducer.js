import {
  SET_ONBOARD,
  SET_DEBOARD
} from '../constants/Qr';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_ONBOARD:
      return { ...state, onboard: action.payload };
    case SET_DEBOARD:
      return { ...state, deboard: action.payload };
    default:
      return state;
  }
};