import axios from 'axios';
import { API_CONFIG } from '../constants';

// Create axios instance
const api = axios.create({
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth token
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

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 Unauthorized (token expired or invalid)
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            // Optional: Redirect to login or dispatch logout action
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
