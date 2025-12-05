import express from 'express';
import {
    createJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob,
    getJobStats,
} from '../controllers/job.controller.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router
    .route('/')
    .get(getJobs)
    .post(protect, authorize('employer', 'admin'), createJob);

router.route('/stats/overall').get(getJobStats);

router
    .route('/:id')
    .get(getJob)
    .put(protect, authorize('employer', 'admin'), updateJob)
    .delete(protect, authorize('employer', 'admin'), deleteJob);

export default router;
