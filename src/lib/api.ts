import axios from 'axios';

export const api = axios.create({
  // Fallback for development, ensure VITE_API_URL is set in your .env
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Add central error logging or notification integration here
    return Promise.reject(error);
  }
);
