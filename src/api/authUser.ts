import axios from "axios";
import { loadTokensFromLocalStorage } from '../utils/localStorage';
import { store } from "../../store/store";
import { login, removeTokens, setTokensWhenRefreshed } from "../../store/AuthReducers/authSlice";

export const API_URL = 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL
});

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    store.dispatch(login())
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  
  async (error) => {
    const originalRequest = error.config;
    
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !(originalRequest.url?.includes('/auth/change-password')) &&
      !(originalRequest.url?.includes('/auth/login'))
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const tokens = await refreshTokens();
          isRefreshing = false;
          onRefreshed(tokens.accessToken);
          originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
      
          return api(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          refreshSubscribers = [];
          return Promise.reject(refreshError);
        }
      } else {
        return new Promise((resolve, _reject) => {
          addRefreshSubscriber((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }
    }
    return Promise.reject(error);
  }
);

export const registrationUser = async (email: string, password: string, age?: string | undefined) => {
    const response = await api.post(`/auth/register`, { email, password, age });
    const tokens = response.data;
    return tokens;
}

export const loginUser = async (email: string, password: string) => {
    const response = await api.post(`/auth/login`, { email, password });
    const tokens = response.data;
    return tokens;
}

export const refreshTokens = async () => {
  try {
    const { refreshToken } = loadTokensFromLocalStorage();
    if (!refreshToken) throw new Error('refreshToken не найден!');
    const response = await api.post(`/auth/refresh`, { refreshToken });
    const tokens = response.data;
    store.dispatch(setTokensWhenRefreshed(tokens));
    return tokens;
  } catch (error) {
      store.dispatch(removeTokens());
  }
}

export const getProfileData = async () => {
  try {
    const response = api.get('/auth/me');
    return response;
  } catch (error) {
    throw new Error('ошибка в методе')
  }
}

export const changePassword = async (oldPassword: string, newPassword: string) => {
    const response = await api.post('/auth/change-password', { oldPassword, newPassword });
    return response;
}