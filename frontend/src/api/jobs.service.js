import client from './client';

const jobsService = {
    // Get All Jobs with filters
    getJobs: async (filters = {}) => {
        // Convert filter object to query string
        const params = new URLSearchParams();

        if (filters.search) params.append('search', filters.search);
        if (filters.location) params.append('location', filters.location);
        if (filters.type) params.append('type', filters.type); // Full-time, etc.
        // Add sorting/pagination if needed

        // Using the search endpoint if search text is present, else standardGetAll
        // Or if backend handles all in one:
        const queryString = params.toString();
        const endpoint = queryString ? `/jobs?${queryString}` : '/jobs';

        const response = await client.get(endpoint);
        return response.data;
    },

    getJobById: async (id) => {
        const response = await client.get(`/jobs/${id}`);
        return response.data;
    },

    createJob: async (jobData) => {
        const response = await client.post('/jobs', jobData);
        return response.data;
    },

    deleteJob: async (id) => {
        const response = await client.delete(`/jobs/${id}`);
        return response.data;
    }
};

export default jobsService;
