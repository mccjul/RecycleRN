import {
  INFO
} from '../constants/Settings';

export default (state = { data: { Type: "", Municipalite: "", Frequence: "", Jour: "", Info: "", NearestDropOff: "", displayModal: false } }, action) => {
  switch (action.type) {
    case INFO:
      return { data: action.payload };
    default:
      return state;
  }
};