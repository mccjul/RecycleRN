import firebase from 'firebase';
import {
  SET_CARD,
} from './../constants/Settings';
import {
  ERROR_SET,
} from './../constants/Auth';

var stripe_tok = require('stripe-client')('pk_test_nxXbBlxixNZlsdnLm78k87EO');

var information = {
  card: {
    number: '4242424242424242',
    exp_month: '02',
    exp_year: '21',
    cvc: '999',
  }
}
export const updateCard = (data) => {
  return async (dispatch) => {
    try {
      const card = await stripe_tok.createToken(information);
      dispatch({
        type: SET_CARD,
        payload: card
      });
    } catch (error) {
      console.log(error);
      let err_message = error.message;
      dispatch({
        type: ERROR_SET,
        payload: err_message
      });
    }
  };
}

export const pay = (amount, start, stop) => {
  return async (dispatch) => {
    try {

      await firebase.auth().onAuthStateChanged(async (user) => {
        const card = await stripe_tok.createToken(information);
        await firebase.database().ref('/payments/' + user.uid).set({
          amount: amount,
          source: card.id,
        });
        await firebase.database().ref('/trip/' + user.uid).set({
          start,
          stop
        });
      })

    } catch (error) {
      console.log(error);
      let err_message = error.message;
      dispatch({
        type: ERROR_SET,
        payload: err_message
      });
    }
  };
}
