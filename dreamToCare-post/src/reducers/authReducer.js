import initialState from './initialState';

export default (state = initialState.auth, action) => {
  switch (action.type) {
    case 'SIGN_UP': {
      const {
        token,
        result: { name, email, address, cnic, _id },
      } = action.payload;
      return { ...state, isSignedIn: true, isNgo: false, name, email, address, cnic, token, id: _id };
    }
    case 'NGO_SIGN_UP': {
      const {
        token,
        result: { ngoName, accountHolderName, email, address, cnic, _id },
      } = action.payload;
      return {
        ...state,
        isSignedIn: true,
        isNgo: true,
        ngoName,
        accountHolderName,
        email,
        address,
        cnic,
        token,
        id: _id,
      };
    }
    case 'SIGN_IN': {
      const {
        token,
        result: { name, email, address, cnic, _id, status, role },
      } = action.payload;
      return {
        ...state,
        isSignedIn: true,
        isNgo: false,
        name,
        email,
        address,
        token,
        cnic,
        id: _id,
        isAdmin: status === 'admin' || role === 'admin',
      };
    }

    case 'NGO_SIGN_IN': {
      const {
        token,
        result: { ngoName, accountHolderName, email, address, cnic, _id },
      } = action.payload;
      return {
        ...state,
        isSignedIn: true,
        isNgo: true,
        ngoName,
        accountHolderName,
        email,
        address,
        token,
        cnic,
        id: _id,
      };
    }

    case 'UPDATE_USER': {
      const { name, address, cnic } = action.payload;
      return { ...state, name, address, cnic };
    }

    case 'UPDATE_NGO': {
      const { ngoName, accountHolderName, address, cnic } = action.payload;
      return { ...state, ngoName, accountHolderName, address, cnic };
    }
    case 'LOGOUT': {
      localStorage.removeItem('persist:auth')
      return initialState.auth
    }
    default:
      return state;
  }
};
