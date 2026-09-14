import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Global interceptor for API errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Backend is completely unreachable
    if (!error.response) {
      return Promise.reject(new Error('Unable to connect to the server. Please check your network or try again later.'));
    }
    
    // DRF Throttling (429 Too Many Requests)
    if (error.response.status === 429) {
      return Promise.reject(new Error('You are sending too many requests. Please wait a moment and try again.'));
    }

    // Other API errors
    return Promise.reject(error);
  }
);

export const fetchProjectsApi = async () => {
  const response = await api.get('/projects/');
  return response.data;
};

export const fetchResumeApi = async () => {
  const response = await api.get('/resume/');
  return response.data;
};

export const submitContactApi = async (payload) => {
  const response = await api.post('/contact/', payload);
  return response.data;
};

export const fetchCertificatesApi = async () => {
  const response = await api.get('/certificates/');
  return response.data;
};

export default api;
