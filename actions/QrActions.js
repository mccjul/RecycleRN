import firebase from 'firebase';

import {
  SET_ONBOARD,
  SET_DEBOARD,
} from './../constants/Qr';
import {
  ERROR_SET,
} from './../constants/Auth';
import NavigatorService from './../utils/navigator';

export const onBoard = (data) => {
  return async (dispatch) => {
    try {
      let arr = data.split(',')

      //await firebase
      dispatch({
        type: SET_ONBOARD,
        payload: { stpNum: arr[0], stpName: arr[1], lon: arr[3], lat: arr[4], type: arr[5] }
      });
      NavigatorService.navigate('waiting_room')
    } catch (error) {
      console.log(error);
      let err_message = error.message;
      dispatch({
        type: ERROR_SET,
        payload: err_message
      });
    }
  }

};

export const deBoard = (data) => {
  return async (dispatch) => {
    try {
      let arr = data.split(',')
      //await firebase
      dispatch({
        type: SET_DEBOARD,
        payload: { stpNum: arr[0], stpName: arr[1], lon: arr[3], lat: arr[4], type: arr[5] }
      });
      NavigatorService.reset("thank_you");
    } catch (error) {
      console.log(error);
      let err_message = error.message;
      dispatch({
        type: ERROR_SET,
        payload: err_message
      });
    }
  }
}