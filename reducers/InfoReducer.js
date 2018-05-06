import {
  INFO
} from '../constants/Settings';

export default (state = { data: { Municipalite: "", Frequence: "", Jour: "", Info: "", displayModal: false } }, action) => {
  switch (action.type) {
    case INFO:
      return { data: action.payload };
    default:
      return state;
  }
};