import client from './client';

const appsService = {
    // Apply to a Job (FormData for Resume upload)
    applyToJob: async (jobId, formData) => {
        // Note: client sets Content-Type to application/json by default
        // We need to let browser set boundary for FormData
        const response = await client.post(`/applications/apply/${jobId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    },

    // Get My Applications (Seeker)
    getMyApplications: async () => {
        const response = await client.get('/applications/my-applications');
        return response.data;
    },

    // Get Job Applications (Employer)
    getJobApplications: async (jobId) => {
        const response = await client.get(`/applications/job/${jobId}`);
        return response.data;
    },

    // Update Status (Employer)
    updateStatus: async (id, status) => {
        const response = await client.put(`/applications/${id}/status`, { status });
        return response.data;
    }
};

export default appsService;
