import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Masalan, autentifikatsiya tokenini qo'shish
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global xatolik qo'llanmasi 
    return Promise.reject(error);
  }
);

export default axiosInstance;
