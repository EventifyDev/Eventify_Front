import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/authSlice';
import { TokenService } from '../services/token.service';

export const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

api.interceptors.request.use(
  config => {
    const token = TokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const isUnauthorized = error.response?.status === 401;
    const isLoginAttempt = originalRequest.url?.includes('/auth/login');
    const isFirstRetry = !originalRequest._retry;
    const isLogoutRequired = error.response?.data?.logout === true;

    if (isLogoutRequired) {
      TokenService.clearTokens();
      store.dispatch(logout());
      return Promise.reject(error);
    }

    if (isUnauthorized && isFirstRetry && !isLoginAttempt) {
      originalRequest._retry = true;

      try {
        const response = await api.post('/auth/refresh');
        const { accessToken, refreshToken } = response.data;
        
        if (accessToken) {
          TokenService.setToken(accessToken);
          
          if (refreshToken) {
            TokenService.setRefreshToken(refreshToken);
          }
          
          return api(originalRequest);
        }
      } catch (refreshError) {
        TokenService.clearTokens();
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);