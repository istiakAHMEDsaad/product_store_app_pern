import axios from 'axios';

// create api instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // send cookies with request
});

export default api;
