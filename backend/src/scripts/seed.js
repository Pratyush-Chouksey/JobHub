import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';
import Company from '../models/Company.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const indianSeekers = [
    {
        name: 'Aarav Sharma',
        email: 'aarav.sharma@example.com',
        password: 'password123',
        role: 'seeker',
        profile: {
            skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
            experience: [],
            education: [],
            bio: 'Full Stack Developer from Bangalore',
        },
    },
    {
        name: 'Diya Patel',
        email: 'diya.patel@example.com',
        password: 'password123',
        role: 'seeker',
        profile: {
            skills: ['Python', 'Django', 'Data Science', 'Machine Learning'],
            bio: 'Data Scientist based in Mumbai',
        },
    },
    {
        name: 'Aditya Kumar',
        email: 'aditya.kumar@example.com',
        password: 'password123',
        role: 'seeker',
        profile: {
            skills: ['Java', 'Spring Boot', 'Microservices'],
            bio: 'Backend Engineer from Hyderabad',
        },
    },
    {
        name: 'Ananya Gupta',
        email: 'ananya.gupta@example.com',
        password: 'password123',
        role: 'seeker',
        profile: {
            skills: ['UI/UX Design', 'Figma', 'Adobe XD'],
            bio: 'Creative Designer from Delhi',
        },
    },
    {
        name: 'Rohan Singh',
        email: 'rohan.singh@example.com',
        password: 'password123',
        role: 'seeker',
        profile: {
            skills: ['DevOps', 'AWS', 'Docker', 'Kubernetes'],
            bio: 'DevOps Engineer from Pune',
        },
    },
    {
        name: 'Ishaan Verma',
        email: 'ishaan.verma@example.com',
        password: 'password123',
        role: 'seeker',
        profile: {
            skills: ['Mobile App Development', 'Flutter', 'Dart'],
            bio: 'Mobile Developer from Chennai',
        },
    },
    {
        name: 'Meera Reddy',
        email: 'meera.reddy@example.com',
        password: 'password123',
        role: 'seeker',
        profile: {
            skills: ['Cybersecurity', 'Network Security', 'Ethical Hacking'],
            bio: 'Security Analyst from Bangalore',
        },
    },
    {
        name: 'Kabir Das',
        email: 'kabir.das@example.com',
        password: 'password123',
        role: 'seeker',
        profile: {
            skills: ['Blockchain', 'Solidity', 'Smart Contracts'],
            bio: 'Blockchain Developer from Kolkata',
        },
    },
];

const indianCompanies = [
    {
        name: 'TechSolutions India',
        description: 'Leading IT services provider.',
        industry: 'Information Technology',
        location: { city: 'Bangalore', country: 'India' },
        email: 'hr@techsolutions.in',
    },
    {
        name: 'Innovate Bangalore',
        description: 'Startup incubator and innovation hub.',
        industry: 'Software',
        location: { city: 'Bangalore', country: 'India' },
        email: 'careers@innovateblr.com',
    },
    {
        name: 'Mumbai Finance Corp',
        description: 'Financial services and fintech solutions.',
        industry: 'Finance',
        location: { city: 'Mumbai', country: 'India' },
        email: 'jobs@mumbaifinance.com',
    },
    {
        name: 'Delhi Digital Designs',
        description: 'Creative agency for digital marketing.',
        industry: 'Marketing',
        location: { city: 'New Delhi', country: 'India' },
        email: 'hello@delhidesigns.com',
    },
    {
        name: 'Hyderabad Health Tech',
        description: 'Healthcare technology solutions.',
        industry: 'Healthcare',
        location: { city: 'Hyderabad', country: 'India' },
        email: 'recruit@hydhealth.com',
    },
];

const jobTitles = [
    'Senior React Developer',
    'Backend Python Engineer',
    'Data Scientist',
    'UX/UI Designer',
    'DevOps Specialist',
    'Mobile App Developer (Flutter)',
    'Security Analyst',
    'Blockchain Developer',
    'Frontend Engineer',
    'Full Stack Developer',
];

const seedData = async () => {
    try {
        await connectDB();

        console.log('Clearing database...');
        await User.deleteMany({});
        await Company.deleteMany({});
        await Job.deleteMany({});
        await Application.deleteMany({});
        console.log('Database cleared.');

        console.log('Creating Seekers...');
        const createdSeekers = await User.create(indianSeekers);
        console.log(`${createdSeekers.length} seekers created.`);

        console.log('Creating Companies and Employers...');
        const companies = [];
        const recruiters = [];

        for (const companyData of indianCompanies) {
            const company = await Company.create({ ...companyData, isVerified: true });
            companies.push(company);

            const recruiterName = companyData.email.split('@')[0];
            const recruiterEmail = companyData.email;

            const recruiter = await User.create({
                name: recruiterName,
                email: recruiterEmail,
                password: 'password123',
                role: 'employer',
                company: company._id,
                jobTitle: 'HR Manager',
            });
            recruiters.push(recruiter);
        }
        console.log(`${companies.length} companies and recruiters created.`);

        console.log('Creating Jobs...');
        const jobs = [];
        for (let i = 0; i < 15; i++) {
            const randomCompanyIndex = Math.floor(Math.random() * companies.length);
            const company = companies[randomCompanyIndex];
            const recruiter = recruiters[randomCompanyIndex];
            const title = jobTitles[i % jobTitles.length];

            const job = await Job.create({
                title: title,
                description: `We are looking for a skilled ${title} to join our team at ${company.name}.`,
                requirements: 'Bachelor\'s degree in Computer Science or related field. 3+ years of experience.',
                company: company._id,
                recruiter: recruiter._id,
                location: company.location.city,
                type: i % 3 === 0 ? 'Remote' : 'Onsite',
                employmentType: 'Full-time',
                skills: ['JavaScript', 'Python', 'React'], // Simplified skills
                salary: {
                    min: 1000000,
                    max: 2500000,
                    currency: 'INR',
                },
                deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            });
            jobs.push(job);
        }
        console.log(`${jobs.length} jobs created.`);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

seedData();
