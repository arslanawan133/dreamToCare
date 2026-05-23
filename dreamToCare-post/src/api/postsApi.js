import axios from 'axios';
import { store } from '../config/store';
import { BASE_URL } from '../constants/apiUrl';

// const API = axios.create({ BASE_URL });

axios.interceptors.request.use((req) => {
  const state = store.getState();
  if (state.auth.token) {
    req.headers.Authorization = `Bearer ${state.auth.token}`;
  }

  return req;
});

export const createDonationPost = (data) => {
  return axios.post(BASE_URL + '/posts/donation', data);
};

export const updateDonationPost = (data, id) => {
  return axios.patch(BASE_URL + `/posts/donation/${id}`, data);
};

export const deleteDonationPost = (id) => {
  return axios.delete(BASE_URL + `/posts/donation/${id}`);
};

export const getDonationPost = () => {
  return axios.get(BASE_URL + '/posts/donation');
};

export const createQueryPost = (data) => {
  return axios.post(BASE_URL + '/posts/query', data);
};

export const getQueryPost = () => {
  return axios.get(BASE_URL + '/posts/query');
};

export const updateQueryPost = (data, id) => {
  return axios.patch(BASE_URL + `/posts/query/${id}`, data);
};

export const deleteQueryPost = (id) => {
  return axios.delete(BASE_URL + `/posts/query/${id}`);
};

export const getMessages = (byTime) => {
  let params = {};
  params[byTime] = true;
  return axios.get(BASE_URL + `/notification`, {
    params
  });
};

export const postMessage = (data) => {
  return axios.post(BASE_URL + `/notification`, data);
};

export const getReportedPosts = (id, type) => {
  return axios.get(BASE_URL + `/posts/reported`);
};

export const reportPost = (id, type) => {
  return axios.patch(BASE_URL + `/report/${type}/${id}`);
};