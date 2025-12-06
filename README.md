# 🚀 JobHub - Your Ultimate Career Connect

JobHub is a full-stack automated job portal application designed to bridge the gap between job seekers and employers. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it offers a seamless experience for finding jobs, managing applications, and recruiting top talent.

## ✨ Key Features

### For Job Seekers
- **User Authentication**: Secure signup and login with JWT.
- **Profile Management**: Update profile details and upload resumes.
- **Job Search**: Browse and filter job listings.
- **Easy Application**: Apply to jobs with a single click.
- **Application Tracking**: View the status of your applied jobs.

### For Employers
- **Company Registration**: Register and manage company profiles.
- **Job Posting**: Create and manage job listings with detailed descriptions.
- **Applicant Management**: View applicants and manage their application status.

## 🛠️ Tech Stack

### Frontend
- **React.js**: Library for building user interfaces.
- **Redux Toolkit**: State management.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Shadcn UI**: Reusable components built with Radix UI and Tailwind CSS.
- **Framer Motion**: For smooth animations.
- **Vite**: Fast build tool and development server.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: Secure authentication.
- **Cloudinary**: Cloud storage for image and file uploads.
- **Multer**: Middleware for handling `multipart/form-data`.

## ⚙️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas)
- Cloudinary Account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd JOB_PORTAL
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add the following variables:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
# Cloudinary Credentials
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory if required by your setup (e.g., API URL):
```env
VITE_API_URL=http://localhost:8000/api/v1
```

Start the frontend development server:
```bash
npm run dev
```

## 📸 Usage

1.  **Access the Application**: Open your browser and go to `http://localhost:5173`.
2.  **Sign Up**: Create an account as a "Student" (Job Seeker) or "Recruiter" (Employer).
3.  **Explore**:
    *   **Students**: Complete your profile, search for jobs, and apply.
    *   **Recruiters**: Register your company, post jobs, and review applications.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the **ISC License**.

---

<p align="center">
  Made with ❤️ by Pratyush Chouksey
</p>
