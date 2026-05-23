import axios from 'axios';
import { BASE_URL } from '../constants/apiUrl';

export const signInRequest = (data) => {
  return axios.post(BASE_URL + '/signin', data);
};

export const signUpRequest = (data) => {
  return axios.post(BASE_URL + '/signup', data);
};

export const ngoSignInRequest = (data) => {
  return axios.post(BASE_URL + '/ngo/signin', data);
};

export const ngoSignUpRequest = (data) => {
  return axios.post(BASE_URL + '/ngo/signup', data);
};

export const updateUserRequest = (data) => {
  return axios.patch(BASE_URL + '/updateUser', data);
};

export const updateNgoRequest = (data) => {
  return axios.patch(BASE_URL + '/updateNgo', data);
};

export const forgotPassword = (data) => {
  return axios.post(BASE_URL + '/forgot-password', data)
}

export const isTokenValid = (data) => {
  return axios.post(BASE_URL + '/check-request', data)
}

export const resetPassword = (data) => {
  return axios.post(BASE_URL + '/reset-password', data)
}

export const changePassword = (data) => {
  return axios.post(BASE_URL + '/change-password', data)
}