import { toast } from 'react-toastify';
import { changePassword, forgotPassword, isTokenValid, ngoSignInRequest, ngoSignUpRequest, resetPassword, signInRequest, signUpRequest, updateNgoRequest, updateUserRequest } from '../api/authApi';
import { startLoadingAction } from './postAction';

const getErrorPayload = (error) => {
  if (error?.response?.data) {
    return error.response.data;
  }

  return {
    message: error?.message || 'Something went wrong. Please try again.',
  };
};

const signInAction = (payload) => {
  return {
    type: 'SIGN_IN',
    payload,
  };
};

const signUpAction = (payload) => {
  return {
    type: 'SIGN_UP',
    payload,
  };
};

const ngoSignInAction = (payload) => {
  return {
    type: 'NGO_SIGN_IN',
    payload,
  };
};

const ngoSignUpAction = (payload) => {
  return {
    type: 'NGO_SIGN_UP',
    payload,
  };
};

const updateUserAction = (payload) => {
  return {
    type: 'UPDATE_USER',
    payload,
  };
};

const updateNgoAction = (payload) => {
  return {
    type: 'UPDATE_NGO',
    payload,
  };
};

export const logoutAction = () => {
  return {
    type: 'LOGOUT',
  };
};

export const SignIn = (data) => async (dispatch) => {
  dispatch(startLoadingAction());
  try {
    const auth = await signInRequest(data);
    if (auth && auth.data.token) {
      dispatch(signInAction(auth.data));
    }
  } catch (error) {
    return getErrorPayload(error);
  }
};

export const NgoSignIn = (data) => async (dispatch) => {
  try {
    const auth = await ngoSignInRequest(data);
    if (auth && auth.data.token) {
      dispatch(ngoSignInAction(auth.data));
      window.location.href = '/';
    }
  } catch (error) {
    return getErrorPayload(error);
  }
};

export const SignUp = (data) => async (dispatch) => {
  dispatch(startLoadingAction());
  try {
    const auth = await signUpRequest(data);
    if (auth && auth.data.token) {
      dispatch(signUpAction(auth.data));
      window.location.href = '/';
    }
  } catch (error) {
    return getErrorPayload(error);
  }
};

export const NgoSignUp = (data) => async (dispatch) => {
  try {
    const auth = await ngoSignUpRequest(data);
    if (auth && auth.data.token) {
      dispatch(ngoSignUpAction(auth.data));
      window.location.href = '/';
    }
  } catch (error) {
    return getErrorPayload(error);
  }
};

export const UpdateUser = (data) => async (dispatch) => {
  try {
    const auth = await updateUserRequest(data);
    if (auth && auth.status === 200) {
      dispatch(updateUserAction(auth.data));
      toast.success('User Updated Successfully');
    }
  } catch (error) {
    return getErrorPayload(error);
  }
};

export const UpdateNgo = (data) => async (dispatch) => {
  try {
    const auth = await updateNgoRequest(data);
    if (auth && auth.status === 200) {
      dispatch(updateNgoAction(auth.data));
      toast.success('User Updated Successfully');
    }
  } catch (error) {
    return getErrorPayload(error);
  }
};

export const ForgotPassword = (data) => async (dispatch) => {
  dispatch(startLoadingAction());
  try {
    await forgotPassword(data);
  } catch (error) {
    return getErrorPayload(error);
  }
};

export const ResetPassword = (data) => async (dispatch) => {
  dispatch(startLoadingAction());
  try {
    await resetPassword(data);
  } catch (error) {
    return getErrorPayload(error);
  }
};

export const IsResetTokenValid = (data) => async (dispatch) => {
  try {
    const auth = await isTokenValid(data);
    if (auth && auth.status === 200) {
      return auth.data
    }
  } catch (error) {
    return getErrorPayload(error);
  }
};

export const ChangePassword = (data) => async (dispatch) => {
  dispatch(startLoadingAction());
  try {
    await changePassword(data);
  } catch (error) {
    return getErrorPayload(error);
  }
};