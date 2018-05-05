import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import QrReducer from './QrReducer';
import SettingsReducer from './SettingsReducer'


export default combineReducers({
  auth: AuthReducer,
  qr: QrReducer,
  settings: SettingsReducer
});