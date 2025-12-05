import client from './client';

const authService = {
    // Register User
    register: async (userData) => {
        const response = await client.post('/auth/register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    // Login User
    login: async (email, password) => {
        const response = await client.post('/auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    // Get Current User Profile
    getMe: async () => {
        const response = await client.get('/auth/me');
        return response.data;
    },

    // Logout
    logout: async () => {
        try {
            await client.get('/auth/logout'); // Backend clears cookie
        } catch (err) {
            console.error('Logout API error', err);
        } finally {
            localStorage.removeItem('token');
        }
    },
};

export default authService;
