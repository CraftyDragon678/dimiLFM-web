import axios from 'axios';

const api = axios.create({
  baseURL: "https://cragon.kro.kr:8080",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (config.url?.split('/')[1] === 'auth') return config;

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 401) return error.response;
    return error;
  },
);

export default api;
