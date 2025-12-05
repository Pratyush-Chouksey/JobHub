import Application from '../models/Application.js';
import ErrorResponse from '../utils/errorResponse.js';

class ApplicationService {
    async createApplication(applicationData, file, userId) {
        if (!file) {
            throw new ErrorResponse('Please upload a resume', 400);
        }

        const application = new Application({
            ...applicationData,
            applicant: userId,
            resumeUrl: file.path, // Store local path for now (would be S3/Cloudinary in prod)
        });

        try {
            await application.save();
            return application;
        } catch (err) {
            // If unique index fails (User already applied)
            if (err.code === 11000) {
                throw new ErrorResponse('You have already applied for this job', 400);
            }
            throw err;
        }
    }

    async getMyApplications(userId) {
        return await Application.find({ applicant: userId })
            .populate({
                path: 'job',
                select: 'title company location status',
                populate: {
                    path: 'company',
                    select: 'name logoUrl'
                }
            })
            .sort('-createdAt');
    }

    async getJobApplications(jobId, userId) {
        // Find job first to check permissions (ideally should be in controller but safe here too)
        // For now assuming controller checked ownership of job
        return await Application.find({ job: jobId })
            .populate('applicant', 'name email profile')
            .sort('-createdAt');
    }

    async updateStatus(appId, status, userId) {
        const application = await Application.findById(appId).populate('job');

        if (!application) {
            throw new ErrorResponse('Application not found', 404);
        }

        // Check if user owns the job
        if (application.job.recruiter.toString() !== userId.toString()) {
            throw new ErrorResponse('Not authorized to update this application', 401);
        }

        application.status = status;
        await application.save();
        return application;
    }
}

export default new ApplicationService();
