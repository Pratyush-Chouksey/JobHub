import Job from '../models/Job.js';
import ErrorResponse from '../utils/errorResponse.js';

class JobService {
    async createJob(jobData, userId) {
        // Add user as recruiter
        jobData.recruiter = userId;

        // Ensure company exists (validation handled by mongoose schema usually, but logic here helps)
        const job = await Job.create(jobData);
        return job;
    }

    async getJobs(queryStr) {
        let query;

        // formatted query
        const reqQuery = { ...queryStr };

        // Fields to remove for filtering
        const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
        removeFields.forEach((param) => delete reqQuery[param]);

        // Create query string for operators ($gt, $gte, etc)
        let queryStrJSON = JSON.stringify(reqQuery);
        queryStrJSON = queryStrJSON.replace(
            /\b(gt|gte|lt|lte|in)\b/g,
            (match) => `$${match}`
        );

        let filter = JSON.parse(queryStrJSON);

        // Text Search
        if (queryStr.search) {
            filter.$text = { $search: queryStr.search };
        }

        // Finding resource
        query = Job.find(filter).populate('company', 'name logoUrl location isVerified');

        // Select Fields
        if (queryStr.select) {
            const fields = queryStr.select.split(',').join(' ');
            query = query.select(fields);
        }

        // Sort
        if (queryStr.sort) {
            const sortBy = queryStr.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = parseInt(queryStr.page, 10) || 1;
        const limit = parseInt(queryStr.limit, 10) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Job.countDocuments(filter);

        query = query.skip(startIndex).limit(limit);

        // Executing query
        const jobs = await query;

        // Pagination result
        const pagination = {};
        if (endIndex < total) {
            pagination.next = { page: page + 1, limit };
        }
        if (startIndex > 0) {
            pagination.prev = { page: page - 1, limit };
        }

        return { jobs, total, pagination };
    }

    async getJob(id) {
        const job = await Job.findById(id).populate('company').populate('recruiter', 'name email');
        if (!job) {
            throw new ErrorResponse(`Job not found with id of ${id}`, 404);
        }
        return job;
    }

    async updateJob(id, data, userId) {
        let job = await Job.findById(id);

        if (!job) {
            throw new ErrorResponse(`Job not found with id of ${id}`, 404);
        }

        // Check ownership
        if (job.recruiter.toString() !== userId.toString()) {
            throw new ErrorResponse(`User ${userId} is not authorized to update this job`, 401);
        }

        job = await Job.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        return job;
    }

    async deleteJob(id, userId) {
        const job = await Job.findById(id);

        if (!job) {
            throw new ErrorResponse(`Job not found with id of ${id}`, 404);
        }

        // Check ownership
        if (job.recruiter.toString() !== userId.toString()) {
            throw new ErrorResponse(`User ${userId} is not authorized to delete this job`, 401);
        }

        // Soft delete
        job.isDeleted = true;
        await job.save();

        return { success: true };
    }

    async getJobStats() {
        const stats = await Job.aggregate([
            { $match: { isDeleted: false } },
            {
                $group: {
                    _id: '$status', // Group by status
                    count: { $sum: 1 },
                    avgSalary: { $avg: '$salary.max' },
                },
            },
            {
                $addFields: {
                    status: "$_id"
                }
            },
            { $sort: { count: -1 } }
        ]);
        return stats;
    }
}

export default new JobService();
