import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

export const setToken = token => {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const login = (email, password) =>
  API.post('/auth/login', {email, password});

export const register = (username, email, password) =>
  API.post('/auth/register', {username, email, password});

export const getFeed = () => API.get('/video');

export const uploadVideo = formData =>
  API.post('/video/upload', formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });

export default API;
