import axios from 'axios';

export const Axios = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL,
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});
