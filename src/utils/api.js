import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't redirect on 401 for login/register endpoints - those are expected failures
    const isAuthEndpoint = error.config?.url?.includes('/auth/');
    
    if (error.response?.status === 401 && !isAuthEndpoint) {
      // Only clear token and redirect if we're not on an auth endpoint
      // and the user was previously authenticated
      const token = localStorage.getItem('token');
      if (token) {
        console.log('401 error on authenticated request, clearing token');
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('demoMode');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
