import axios from 'axios';
import { TokenService } from '../services/token.service';
import { logout } from '../store/authSlice';
import store from '../store';

const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// add token to request
api.interceptors.request.use((config) => {
  const token = TokenService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);
