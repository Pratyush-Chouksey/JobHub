import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Company from '../models/Company.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';

dotenv.config(); // Ensure this points to correct .env if running from root

const runTest = async () => {
    // Use a local test DB to avoid messing with production/dev data
    const TEST_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/jobhub_test';

    console.log(`Connecting to ${TEST_URI}...`);

    try {
        await mongoose.connect(TEST_URI);
        console.log('DB Connected.');

        // Cleanup previous runs
        await mongoose.connection.db.dropDatabase();
        console.log('Cleaned up old test data.');

        // 1. Create Company
        const company = await Company.create({
            name: 'Tech Corp',
            industry: 'Software',
            location: { city: 'San Francisco', state: 'CA', country: 'USA' },
            isVerified: true
        });
        console.log('✅ Company created:', company.name);

        // 2. Create Employer
        const employer = await User.create({
            name: 'Alice Recruiter',
            email: 'alice@techcorp.com',
            password: 'password123',
            role: 'employer',
            company: company._id,
            jobTitle: 'HR Manager'
        });
        console.log('✅ Employer created:', employer.name);

        // 3. Create Seeker
        const seeker = await User.create({
            name: 'Bob Candidate',
            email: 'bob@example.com',
            password: 'password123',
            role: 'seeker',
            profile: {
                skills: ['JavaScript', 'React'],
                resumeUrl: 'http://example.com/resume.pdf'
            }
        });
        console.log('✅ Seeker created:', seeker.name);

        // 4. Create Job
        const job = await Job.create({
            title: 'Frontend Developer',
            description: 'We need a React dev.',
            company: company._id,
            recruiter: employer._id,
            requirements: '3+ years experience',
            location: 'Remote',
            type: 'Remote',
            skills: ['React', 'JavaScript'],
            salary: { min: 100000, max: 150000 }
        });
        console.log('✅ Job created:', job.title);

        // 5. Create Application
        const application = await Application.create({
            job: job._id,
            applicant: seeker._id,
            resumeUrl: seeker.profile.resumeUrl,
            coverLetter: 'I am the best fit.'
        });
        console.log('✅ Application created:', application._id);

        // Verify Job Application Count (via post-save hook)
        const updatedJob = await Job.findById(job._id);
        if (updatedJob.applicationCount === 1) {
            console.log('✅ Job application count updated correctly.');
        } else {
            console.error('❌ Job application count failed:', updatedJob.applicationCount);
        }

        console.log('All tests passed!');
    } catch (error) {
        console.error('❌ Error during test:', error);
    } finally {
        await mongoose.connection.close();
        process.exit();
    }
};

runTest();
