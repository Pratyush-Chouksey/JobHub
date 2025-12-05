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


router.post('/', protect, authorize('seeker'), upload.single('resume'), apply);

router.get('/me', protect, authorize('seeker'), getMyApplications);

router.get('/job/:jobId', protect, authorize('employer', 'admin'), getJobApplications);

router.put('/:id/status', protect, authorize('employer', 'admin'), updateStatus);

export default router;
