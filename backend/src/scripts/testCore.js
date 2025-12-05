import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Company from '../models/Company.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import JobService from '../services/job.service.js';
import ApplicationService from '../services/application.service.js';

dotenv.config();

const runTest = async () => {
    // 1. Setup
    const TEST_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/jobhub_core_test';
    console.log(`Connection to ${TEST_URI}...`);
    await mongoose.connect(TEST_URI);
    await mongoose.connection.db.dropDatabase();

    try {
        // 2 Create Actors
        const company = await Company.create({ name: 'Google', industry: 'Tech' });
        const employer = await User.create({ name: 'Emp', email: 'emp@test.com', password: 'password123', role: 'employer', company: company._id });
        const seeker = await User.create({ name: 'Seek', email: 'seek@test.com', password: 'password123', role: 'seeker' });

        // Ensure Indexes for Text Search
        await Job.syncIndexes();

        // 3. Create Job (via Service)
        console.log('--- Testing Job Creation ---');
        const jobData = {
            title: 'Software Engineer',
            description: 'Code things',
            requirements: 'NodeJS',
            company: company._id,
            location: 'Remote',
            skills: ['NodeJS', 'React']
        };
        const job = await JobService.createJob(jobData, employer._id);
        console.log('✅ Job Created:', job.title);

        // 4. Search Jobs (via Service)
        console.log('--- Testing Job Search ---');
        const searchResult = await JobService.getJobs({ search: 'Software', location: 'Remote' });
        if (searchResult.total === 1) console.log('✅ Job Search Correct');
        else console.log('❌ Job Search Failed', searchResult.total);

        // 5. Apply (via Service)
        console.log('--- Testing Application ---');
        // Mock File
        const fileMock = { path: 'uploads/resumes/dummy.pdf' };
        const app = await ApplicationService.createApplication({ job: job._id, coverLetter: 'Hire me' }, fileMock, seeker._id);
        console.log('✅ Application Created:', app._id);

        // 6. Verify Job Stats
        const jobCheck = await Job.findById(job._id);
        if (jobCheck.applicationCount === 1) console.log('✅ Application Count Updated');
        else console.log('❌ Application Count Failed');

        // 7. Get Applications (Employer View)
        const apps = await ApplicationService.getJobApplications(job._id, employer._id);
        if (apps.length === 1) console.log('✅ Employer saw application');
        else console.log('❌ Employer view failed');

    } catch (err) {
        console.error('❌ Test Failed:', err.message);
    } finally {
        await mongoose.connection.close();
        process.exit();
    }
};

runTest();
