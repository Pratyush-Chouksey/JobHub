import express from 'express';
import {
    apply,
    getMyApplications,
    getJobApplications,
    updateStatus,
} from '../controllers/application.controller.js';
import { protect, authorize } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Apply (Seeker only)
router.post('/', protect, authorize('seeker'), upload.single('resume'), apply);

// Get my applications (Seeker)
router.get('/me', protect, authorize('seeker'), getMyApplications);

// Get applications for a job (Employer)
router.get('/job/:jobId', protect, authorize('employer', 'admin'), getJobApplications);

// Update status (Employer)
router.put('/:id/status', protect, authorize('employer', 'admin'), updateStatus);

export default router;
