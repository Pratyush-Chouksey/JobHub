import asyncHandler from '../middleware/async.js';
import ApplicationService from '../services/application.service.js';
import Job from '../models/Job.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Submit application
// @route   POST /api/v1/applications
// @access  Private (Seeker)
export const apply = asyncHandler(async (req, res, next) => {
    const application = await ApplicationService.createApplication(req.body, req.file, req.user.id);
    res.status(201).json({ success: true, data: application });
});

// @desc    Get current user's applications
// @route   GET /api/v1/applications/me
// @access  Private (Seeker)
export const getMyApplications = asyncHandler(async (req, res, next) => {
    const applications = await ApplicationService.getMyApplications(req.user.id);
    res.status(200).json({ success: true, count: applications.length, data: applications });
});

// @desc    Get applications for a specific job
// @route   GET /api/v1/applications/job/:jobId
// @access  Private (Employer)
export const getJobApplications = asyncHandler(async (req, res, next) => {
    // Check if user owns job first
    const job = await Job.findById(req.params.jobId);
    if (!job) {
        return next(new ErrorResponse('Job not found', 404));
    }
    if (job.recruiter.toString() !== req.user.id) {
        return next(new ErrorResponse('Not authorized', 401));
    }

    const applications = await ApplicationService.getJobApplications(req.params.jobId, req.user.id);
    res.status(200).json({ success: true, count: applications.length, data: applications });
});

// @desc    Update application status
// @route   PUT /api/v1/applications/:id/status
// @access  Private (Employer)
export const updateStatus = asyncHandler(async (req, res, next) => {
    const application = await ApplicationService.updateStatus(req.params.id, req.body.status, req.user.id);
    res.status(200).json({ success: true, data: application });
});
