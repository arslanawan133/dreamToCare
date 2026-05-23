import axios from 'axios';
import { store } from '../config/store';
import { BASE_URL } from '../constants/apiUrl';

axios.interceptors.request.use((req) => {
  const state = store.getState();
  if (state.auth.token) {
    req.headers.Authorization = `Bearer ${state.auth.token}`;
  }

  return req;
});

export const getLocations = () => {
  return axios.get(BASE_URL + '/dastarkhawan');
};

export const postLocations = (data) => {
  return axios.post(BASE_URL + '/dastarkhawan', data);
};

export const updateLocation = (data) => {
  return axios.patch(BASE_URL + '/dastarkhawan', data);
};

export const deleteLocation = (_id) => {
  return axios.delete(BASE_URL + '/dastarkhawan/' + _id);
};
