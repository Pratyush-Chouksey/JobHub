import asyncHandler from '../middleware/async.js';
import JobService from '../services/job.service.js';

// @desc    Get all jobs
// @route   GET /api/v1/jobs
// @access  Public
export const getJobs = asyncHandler(async (req, res, next) => {
    const result = await JobService.getJobs(req.query);
    res.status(200).json({ success: true, count: result.jobs.length, pagination: result.pagination, data: result.jobs });
});

// @desc    Get single job
// @route   GET /api/v1/jobs/:id
// @access  Public
export const getJob = asyncHandler(async (req, res, next) => {
    const job = await JobService.getJob(req.params.id);
    res.status(200).json({ success: true, data: job });
});

// @desc    Create new job
// @route   POST /api/v1/jobs
// @access  Private (Employer)
export const createJob = asyncHandler(async (req, res, next) => {
    const job = await JobService.createJob(req.body, req.user.id);
    res.status(201).json({ success: true, data: job });
});

// @desc    Update job
// @route   PUT /api/v1/jobs/:id
// @access  Private (Owner)
export const updateJob = asyncHandler(async (req, res, next) => {
    const job = await JobService.updateJob(req.params.id, req.body, req.user.id);
    res.status(200).json({ success: true, data: job });
});

// @desc    Delete job
// @route   DELETE /api/v1/jobs/:id
// @access  Private (Owner)
export const deleteJob = asyncHandler(async (req, res, next) => {
    await JobService.deleteJob(req.params.id, req.user.id);
    res.status(200).json({ success: true, data: {} });
});

// @desc    Get job stats
// @route   GET /api/v1/jobs/stats/overall
// @access  Public
export const getJobStats = asyncHandler(async (req, res, next) => {
    const stats = await JobService.getJobStats();
    res.status(200).json({ success: true, data: stats });
});
