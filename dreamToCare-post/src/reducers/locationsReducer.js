import initialState from './initialState';

export default (state = initialState.locations, action) => {
  switch (action.type) {
    case 'GET_LOCATIONS': {
      return (state = action.payload);
    }
    case 'CREATE_LOCATION': {
      const location = state.findIndex((e) => e._id === action.payload._id);
      if (location > -1) {
        state[location] = action.payload;
        return state;
      } else {
        return state.concat(action.payload);
      }
    }
    case 'UPDATE_LOCATION': {
      const location = state.findIndex((e) => e._id === action.payload._id);
      if (location > -1) {
        state[location] = action.payload;
        return state;
      }
      return state
    }

    case 'DELETE_LOCATION': {
      state = state.filter((e) => e._id !== action.payload._id);
      return state;
    }

    default:
      return state;
  }
};
