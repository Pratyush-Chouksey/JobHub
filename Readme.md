
---

# 📌 **JobHub – Smart Job Listing & Hiring Platform**

JobHub is a full-stack job listing and recruitment platform designed to simplify the hiring process for both job seekers and employers. It solves the common problem of scattered job postings, limited filtering options, and outdated listings by providing a centralized, user-friendly system. The platform includes secure JWT authentication, job posting and searching features, an application management system, and user profiles — all deployed using modern cloud hosting services. The system architecture follows a clean flow: **Frontend (React) → Backend API (Node.js + Express) → MongoDB Atlas**, ensuring scalability and performance. JobHub provides features like role-based access, profile management, job filtering, employer dashboards, and full CRUD functionality for job postings. The project is currently hosted with **Frontend on Vercel** and **Backend on Render**, making it easily accessible for testing and deployment.

---

## 🔗 **Live Links**

| Component                      | URL                                                                        |
| ------------------------------ | -------------------------------------------------------------------------- |
| **Frontend (React + Vercel)**  | [https://job-hub-nu-tawny.vercel.app](https://job-hub-mauve.vercel.app) |
| **Backend (Node.js + Render)** | [https://jobhub-6qx8.onrender.com](https://jobhub-production-5245.up.railway.app/)       |

---

## 📐 **System Architecture**

| Layer                 | Description                             |
| --------------------- | --------------------------------------- |
| **Architecture Flow** | Frontend → Backend API → Database       |
| **Frontend**          | React.js, React Router, Axios           |
| **Backend**           | Node.js, Express.js                     |
| **Database**          | MongoDB Atlas                           |
| **Authentication**    | JWT (Role-based: Employer / Job Seeker) |
| **Hosting**           | Vercel (Frontend), Render (Backend)     |

---

## 🚀 **Key Features**

| Category                           | Features                                                                |
| ---------------------------------- | ----------------------------------------------------------------------- |
| **Authentication & Authorization** | Login, signup, logout, JWT protection, role-based access                |
| **Job Management (CRUD)**          | Employers can create, update, delete, and view job listings             |
| **Job Search & Filters**           | Search by title, company, location, skills                              |
| **Application Management**         | Job seekers can apply; employers can view/manage applications           |
| **Profile System**                 | Editable profile, resume upload, skills showcase                        |
| **Frontend Routing**               | Pages: Home, Login, Register, Dashboard, Job Details, Profile, Post Job |
| **Admin Panel (Optional)**         | Manage users & job postings                                             |
| **Hosting**                        | Fully deployed frontend & backend                                       |

---

## 🛠 **Tech Stack**

| Layer                     | Technologies                                  |
| ------------------------- | --------------------------------------------- |
| **Frontend**              | React.js, React Router, Axios, TailwindCSS    |
| **Backend**               | Node.js, Express.js                           |
| **Database**              | MongoDB Atlas                                 |
| **Authentication**        | JSON Web Tokens (JWT)                         |
| **Hosting**               | Vercel (Frontend), Render (Backend)           |
| **Optional Enhancements** | Cloudinary, Socket.io, OpenAI recommendations |

---

## 📡 **API Overview**

| Endpoint             | Method  | Description                               | Access          |
| -------------------- | ------- | ----------------------------------------- | --------------- |
| `/api/auth/signup`   | POST    | Register a new user                       | Public          |
| `/api/auth/login`    | POST    | Login and return JWT                      | Public          |
| `/api/jobs`          | GET     | Fetch all job listings (supports filters) | Public          |
| `/api/jobs/:id`      | GET     | Fetch job details by ID                   | Public          |
| `/api/jobs`          | POST    | Create a job listing                      | Employer Only   |
| `/api/jobs/:id`      | PUT     | Update a job                              | Employer Only   |
| `/api/jobs/:id`      | DELETE  | Delete a job                              | Employer Only   |
| `/api/applications`  | POST    | Apply for a job                           | Job Seeker Only |
| `/api/users/profile` | GET/PUT | Get or update user profile                | Authenticated   |

---

## 🔮 **Future Scope**

* AI-based job recommendations (OpenAI/TensorFlow)
* Resume parsing & automated skill extraction
* Admin analytics dashboard
* Email or push notifications for job updates

