import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';

const client = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // For cookies (refresh token)
});

// Request Interceptor: Attach Token
client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle Errors (e.g., 401 Logout)
client.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Optional: Logic to refresh token automatically could go here
        // For MVP, if 401, we might just let the AuthContext handle logout
        if (error.response?.status === 401) {
            // localStorage.removeItem('token');
            // window.location.href = '/login'; 
            // Better to let the calling service handle this or use an event bus
        }
        return Promise.reject(error); // Propagate error to caller
    }
);

export default client;
