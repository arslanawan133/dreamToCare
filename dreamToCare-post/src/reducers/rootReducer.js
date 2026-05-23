import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import PostReducer from './posts';
import MessageReducer from './messages';
import locationReducer from './locationsReducer';
import initialState from './initialState';

export default combineReducers({
  auth: AuthReducer,
  posts: PostReducer,
  messages: MessageReducer,
  locations: locationReducer,
  gotNotification: (state = initialState.gotNotification, action) => {
    switch (action.type) {
      case 'GOT_NOTIFICATION': {
        return true;
      }

      case 'READ_NOTIFICATION': {
        return false;
      }

      default:
        return state;
    }
  }
});
