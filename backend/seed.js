import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";
import { Application } from "./models/application.model.js";

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding");

        // Clear existing data
        await Application.deleteMany({});
        await Job.deleteMany({});
        await Company.deleteMany({});
        await User.deleteMany({});
        console.log("Cleared existing data");

        const hashedPassword = await bcrypt.hash("password123", 10);

        // 1. Create Recruiters (Indian Context)
        const recruiters = await User.create([
            {
                fullname: "Rajesh Kumar",
                email: "rajesh.kumar@techindia.com",
                phoneNumber: 9876543210,
                password: hashedPassword,
                role: "recruiter",
                profile: { bio: "Senior HR Manager at Tech India", profilePhoto: "https://randomuser.me/api/portraits/men/1.jpg" }
            },
            {
                fullname: "Priya Sharma",
                email: "priya.sharma@innovatesolutions.in",
                phoneNumber: 9988776655,
                password: hashedPassword,
                role: "recruiter",
                profile: { bio: "Talent Acquisition Head", profilePhoto: "https://randomuser.me/api/portraits/women/2.jpg" }
            },
            {
                fullname: "Amit Verma",
                email: "amit.verma@tcs.com",
                phoneNumber: 9123456780,
                password: hashedPassword,
                role: "recruiter",
                profile: { bio: "HR Executive at TCS", profilePhoto: "https://randomuser.me/api/portraits/men/3.jpg" }
            },
            {
                fullname: "Suresh Raina",
                email: "suresh.raina@infosys.com",
                phoneNumber: 9876543211,
                password: hashedPassword,
                role: "recruiter",
                profile: { bio: "Recruitment Lead at Infosys", profilePhoto: "https://randomuser.me/api/portraits/men/4.jpg" }
            },
            {
                fullname: "Anjali Deshmukh",
                email: "anjali.deshmukh@wipro.com",
                phoneNumber: 9988776656,
                password: hashedPassword,
                role: "recruiter",
                profile: { bio: "HR Manager at Wipro", profilePhoto: "https://randomuser.me/api/portraits/women/5.jpg" }
            }
        ]);
        console.log("Created Recruiters");

        // 2. Create Students (Indian Context)
        const students = await User.create([
            {
                fullname: "Amit Patel",
                email: "amit.patel@gmail.com",
                phoneNumber: 9123456789,
                password: hashedPassword,
                role: "student",
                profile: {
                    bio: "Full Stack Developer | IIT Bombay Graduate",
                    skills: ["React", "Node.js", "MongoDB", "Python"],
                    profilePhoto: "https://randomuser.me/api/portraits/men/6.jpg"
                }
            },
            {
                fullname: "Sneha Gupta",
                email: "sneha.gupta@yahoo.com",
                phoneNumber: 8899001122,
                password: hashedPassword,
                role: "student",
                profile: {
                    bio: "Aspiring Data Scientist | 2 Years Experience",
                    skills: ["Python", "Machine Learning", "SQL", "Tableau"],
                    profilePhoto: "https://randomuser.me/api/portraits/women/7.jpg"
                }
            },
            {
                fullname: "Vikram Singh",
                email: "vikram.singh@outlook.com",
                phoneNumber: 7766554433,
                password: hashedPassword,
                role: "student",
                profile: {
                    bio: "Frontend Developer | React Native Expert",
                    skills: ["React Native", "JavaScript", "TypeScript"],
                    profilePhoto: "https://randomuser.me/api/portraits/men/8.jpg"
                }
            },
            {
                fullname: "Rahul Dravid",
                email: "rahul.dravid@gmail.com",
                phoneNumber: 9111222333,
                password: hashedPassword,
                role: "student",
                profile: {
                    bio: "Java Developer | NIT Graduate",
                    skills: ["Java", "Spring Boot", "MySQL"],
                    profilePhoto: "https://randomuser.me/api/portraits/men/9.jpg"
                }
            },
            {
                fullname: "Pooja Hegde",
                email: "pooja.hegde@gmail.com",
                phoneNumber: 8888999900,
                password: hashedPassword,
                role: "student",
                profile: {
                    bio: "UI/UX Designer | 3 Years Experience",
                    skills: ["Figma", "Adobe XD", "HTML", "CSS"],
                    profilePhoto: "https://randomuser.me/api/portraits/women/10.jpg"
                }
            }
        ]);
        console.log("Created Students");

        // 3. Create Companies (Indian Context)
        const companies = await Company.create([
            {
                name: "Tech India Pvt Ltd",
                description: "Leading IT services company in Bangalore.",
                website: "https://www.techindia.com",
                location: "Bangalore, Karnataka",
                logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", // Placeholder
                userId: recruiters[0]._id
            },
            {
                name: "Innovate Solutions",
                description: "Innovative startup focused on AI and ML solutions.",
                website: "https://www.innovatesolutions.in",
                location: "Gurgaon, Haryana",
                logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", // Placeholder
                userId: recruiters[1]._id
            },
            {
                name: "Tata Consultancy Services",
                description: "Global leader in IT services, consulting, and business solutions.",
                website: "https://www.tcs.com",
                location: "Mumbai, Maharashtra",
                logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
                userId: recruiters[2]._id
            },
            {
                name: "Infosys Limited",
                description: "Global leader in next-generation digital services and consulting.",
                website: "https://www.infosys.com",
                location: "Bangalore, Karnataka",
                logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
                userId: recruiters[3]._id
            },
            {
                name: "Wipro Enterprises",
                description: "Leading global information technology, consulting and business process services company.",
                website: "https://www.wipro.com",
                location: "Bangalore, Karnataka",
                logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
                userId: recruiters[4]._id
            },
            {
                name: "HCL Technologies",
                description: "Next-generation global technology company that helps enterprises reimagine their businesses for the digital age.",
                website: "https://www.hcltech.com",
                location: "Noida, Uttar Pradesh",
                logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/HCL_Technologies_logo.svg",
                userId: recruiters[0]._id
            },
            {
                name: "Reliance Jio Infocomm",
                description: "Indian telecommunications company and subsidiary of Jio Platforms.",
                website: "https://www.jio.com",
                location: "Mumbai, Maharashtra",
                logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Jio_Logo.png/220px-Jio_Logo.png",
                userId: recruiters[1]._id
            },
            {
                name: "Flipkart Internet Pvt Ltd",
                description: "E-commerce company based in Bangalore, Karnataka, India.",
                website: "https://www.flipkart.com",
                location: "Bangalore, Karnataka",
                logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Flipkart_logo.svg/1200px-Flipkart_logo.svg.png",
                userId: recruiters[2]._id
            },
            {
                name: "Zomato Media Pvt Ltd",
                description: "Indian multinational restaurant aggregator and food delivery company.",
                website: "https://www.zomato.com",
                location: "Gurgaon, Haryana",
                logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Zomato_Logo.svg",
                userId: recruiters[3]._id
            },
            {
                name: "Swiggy",
                description: "India's leading on-demand delivery platform.",
                website: "https://www.swiggy.com",
                location: "Bangalore, Karnataka",
                logo: "https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg",
                userId: recruiters[4]._id
            },
            {
                name: "Paytm",
                description: "Indian digital payments and financial services company.",
                website: "https://paytm.com",
                location: "Noida, Uttar Pradesh",
                logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg",
                userId: recruiters[0]._id
            },
            {
                name: "Ola Cabs",
                description: "Indian multinational ridesharing company.",
                website: "https://www.olacabs.com",
                location: "Bangalore, Karnataka",
                logo: "https://upload.wikimedia.org/wikipedia/commons/1/16/Ola_Cabs_logo_no_text.svg",
                userId: recruiters[1]._id
            }
        ]);
        console.log("Created Companies");

        // 4. Create Jobs (Indian Context)
        const jobs = await Job.create([
            {
                title: "Senior React Developer",
                description: "We are looking for an experienced React developer to join our team in Bangalore.",
                requirements: ["React", "Redux", "5+ years experience"],
                salary: 2500000,
                experienceLevel: 5,
                location: "Bangalore",
                jobType: "Full Time",
                position: 2,
                company: companies[0]._id, // Tech India
                created_by: recruiters[0]._id
            },
            {
                title: "Data Scientist",
                description: "Join our AI team to build predictive models.",
                requirements: ["Python", "TensorFlow", "Statistics"],
                salary: 1800000,
                experienceLevel: 3,
                location: "Gurgaon",
                jobType: "Full Time",
                position: 1,
                company: companies[1]._id, // Innovate Solutions
                created_by: recruiters[1]._id
            },
            {
                title: "Java Developer",
                description: "Backend developer needed for large scale enterprise applications.",
                requirements: ["Java", "Spring Boot", "Microservices"],
                salary: 1200000,
                experienceLevel: 2,
                location: "Mumbai",
                jobType: "Remote",
                position: 5,
                company: companies[2]._id, // TCS
                created_by: recruiters[2]._id
            },
            {
                title: "System Engineer",
                description: "Freshers required for system engineering roles.",
                requirements: ["C++", "Java", "SQL"],
                salary: 400000,
                experienceLevel: 0,
                location: "Mysore",
                jobType: "Full Time",
                position: 15,
                company: companies[3]._id, // Infosys
                created_by: recruiters[3]._id
            },
            {
                title: "Project Manager",
                description: "Experienced Project Manager to lead agile teams.",
                requirements: ["Agile", "Scrum", "JIRA", "8+ years experience"],
                salary: 3000000,
                experienceLevel: 8,
                location: "Hyderabad",
                jobType: "Full Time",
                position: 1,
                company: companies[4]._id, // Wipro
                created_by: recruiters[4]._id
            },
            {
                title: "DevOps Engineer",
                description: "DevOps expert needed for cloud infrastructure management.",
                requirements: ["AWS", "Docker", "Kubernetes", "Jenkins"],
                salary: 1500000,
                experienceLevel: 3,
                location: "Noida",
                jobType: "Hybrid",
                position: 2,
                company: companies[5]._id, // HCL
                created_by: recruiters[0]._id
            },
            {
                title: "Network Engineer",
                description: "Maintain and upgrade our extensive network infrastructure.",
                requirements: ["CCNA", "Networking", "Linux"],
                salary: 800000,
                experienceLevel: 2,
                location: "Mumbai",
                jobType: "Full Time",
                position: 4,
                company: companies[6]._id, // Jio
                created_by: recruiters[1]._id
            },
            {
                title: "SDE-2",
                description: "Software Development Engineer II needed for e-commerce platform.",
                requirements: ["Java", "Spring", "Distributed Systems", "DSA"],
                salary: 3500000,
                experienceLevel: 4,
                location: "Bangalore",
                jobType: "Full Time",
                position: 3,
                company: companies[7]._id, // Flipkart
                created_by: recruiters[2]._id
            },
            {
                title: "Product Manager",
                description: "Drive product strategy and roadmap for food delivery app.",
                requirements: ["Product Management", "Analytics", "UX/UI"],
                salary: 2800000,
                experienceLevel: 5,
                location: "Gurgaon",
                jobType: "Full Time",
                position: 1,
                company: companies[8]._id, // Zomato
                created_by: recruiters[3]._id
            },
            {
                title: "Backend Developer",
                description: "Build robust backend APIs for high-volume traffic.",
                requirements: ["Go", "Node.js", "PostgreSQL"],
                salary: 2200000,
                experienceLevel: 3,
                location: "Bangalore",
                jobType: "Remote",
                position: 3,
                company: companies[9]._id, // Swiggy
                created_by: recruiters[4]._id
            },
            {
                title: "Android Developer",
                description: "Develop and maintain our mobile payment application.",
                requirements: ["Kotlin", "Android SDK", "MVVM"],
                salary: 1600000,
                experienceLevel: 2,
                location: "Noida",
                jobType: "Full Time",
                position: 2,
                company: companies[10]._id, // Paytm
                created_by: recruiters[0]._id
            },
            {
                title: "iOS Developer",
                description: "Create seamless mobility experiences for iOS users.",
                requirements: ["Swift", "iOS SDK", "UIKit"],
                salary: 1800000,
                experienceLevel: 3,
                location: "Bangalore",
                jobType: "Full Time",
                position: 2,
                company: companies[11]._id, // Ola
                created_by: recruiters[1]._id
            },
            {
                title: "Frontend Developer",
                description: "Angular expert needed for our enterprise dashboard.",
                requirements: ["Angular", "TypeScript", "RxJS"],
                salary: 1000000,
                experienceLevel: 2,
                location: "Chennai",
                jobType: "Full Time",
                position: 3,
                company: companies[0]._id, // Tech India
                created_by: recruiters[0]._id
            },
            {
                title: "QA Engineer",
                description: "Ensure software quality through automated testing.",
                requirements: ["Selenium", "Java", "TestNG"],
                salary: 600000,
                experienceLevel: 1,
                location: "Pune",
                jobType: "Full Time",
                position: 4,
                company: companies[2]._id, // TCS
                created_by: recruiters[2]._id
            },
            {
                title: "Business Analyst",
                description: "Bridge the gap between IT and business teams.",
                requirements: ["Requirement Analysis", "SQL", "Communication"],
                salary: 900000,
                experienceLevel: 2,
                location: "Hyderabad",
                jobType: "Full Time",
                position: 2,
                company: companies[3]._id, // Infosys
                created_by: recruiters[3]._id
            }
        ]);
        console.log("Created Jobs");

        // 5. Create Applications
        // Distribute some applications
        await Application.create([
            {
                job: jobs[0]._id,
                applicant: students[0]._id,
                status: "pending"
            },
            {
                job: jobs[1]._id,
                applicant: students[1]._id,
                status: "accepted"
            },
            {
                job: jobs[7]._id, // Flipkart SDE2
                applicant: students[0]._id, // Amit Patel
                status: "pending"
            },
            {
                job: jobs[3]._id, // Infosys System Engineer
                applicant: students[3]._id, // Rahul Dravid
                status: "pending"
            },
            {
                job: jobs[8]._id, // Zomato PM
                applicant: students[4]._id, // Pooja Hegde
                status: "rejected"
            }
        ]);


        // Update job application arrays
        const createdApps = await Application.find({});
        for (const app of createdApps) {
            await Job.findByIdAndUpdate(app.job, { $push: { applications: app._id } });
        }

        console.log("Created Applications");

        console.log("Database seeded successfully");
        process.exit(0);

    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedData();
