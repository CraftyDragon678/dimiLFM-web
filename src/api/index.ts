import axios from 'axios';
import history from '../router/history';

const api = axios.create({
  baseURL: `https://${process.env.API_HOST}:${process.env.API_PORT}`,
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
