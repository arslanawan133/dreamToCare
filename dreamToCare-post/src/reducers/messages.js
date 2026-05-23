import initialState from './initialState';

export default (state = initialState.messages, action) => {
  switch (action.type) {
    case 'GET_MESSAGES': {
      return (state = action.payload);
    }
    case 'POST_MESSAGE': {
      return (state = action.payload);
    }

    default:
      return state;
  }
};
