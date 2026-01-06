import axios from 'axios';
import axiosRetry from 'axios-retry';
import { getErrorMessage } from './errorHandler';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Configure retry logic
axiosRetry(api, {
  retries: 2, // Retry up to 2 times (3 total attempts)
  retryDelay: axiosRetry.exponentialDelay, // Exponential backoff: 1s, 2s, 4s...
  retryCondition: (error) => {
    // Don't retry on auth/validation errors
    const status = error.response?.status;
    if (status && (status === 400 || status === 401 || status === 403 || status === 404 || status === 409)) {
      return false;
    }

    // Retry on network errors, timeouts, or 5xx server errors
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      (status && status >= 500) ||
      error.code === 'ECONNABORTED'
    );
  },
  onRetry: (retryCount, error, requestConfig) => {
    // Show feedback on first retry
    if (retryCount === 1) {
      console.log(`Retrying request to ${requestConfig.url}...`);
      toast.loading('Connection issue detected. Retrying...', {
        id: 'retry-toast',
        duration: 2000,
      });
    }
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
  (response) => {
    // Dismiss retry toast on success
    toast.dismiss('retry-toast');
    return response;
  },
  (error) => {
    // Dismiss retry toast
    toast.dismiss('retry-toast');

    // Don't redirect on 401 for login/register endpoints - those are expected failures
    const isAuthEndpoint = error.config?.url?.includes('/auth/');

    if (error.response?.status === 401 && !isAuthEndpoint) {
      // Only clear token and redirect if we're not on an auth endpoint
      // and the user was previously authenticated
      const token = localStorage.getItem('token');
      if (token) {
        console.log('Session expired, redirecting to login');
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('demoMode');

        // Add user-friendly message to error
        error.userMessage = 'Your session has expired. Please log in again.';

        // Redirect after a brief moment to allow error to be displayed
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      }
    }

    // Attach user-friendly message to error object for pages to use
    if (!error.userMessage) {
      error.userMessage = getErrorMessage(error);
    }

    return Promise.reject(error);
  }
);

export default api;
