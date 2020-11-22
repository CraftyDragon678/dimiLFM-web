import axios from 'axios';
import history from '../router/history';

const api = axios.create({
  baseURL: "https://172.19.3.24:8080",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (config.url?.split('/')[1] === 'auth') return config;

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 401) {
      if (history.location.pathname !== '/login') {
        history.push('/login');
      }
      return error.response;
    }
    return error;
  },
);

export default api;
