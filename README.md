# JobHub

JobHub is a recruitment platform connecting job seekers and employers.

## Project Structure

This project is a monorepo-style setup containing both the frontend and backend.

```
JobHub/
├── backend/   # Node.js + Express + MongoDB
└── frontend/  # React + Vite + Tailwind CSS v4
```

## Backend

### Tech Stack
- **Node.js** & **Express**
- **MongoDB** with **Mongoose**
- **JWT** for Authentication

### Directory Structure
- `config/`: Database connection and env configuration.
- `controllers/`: Request handling logic.
- `models/`: Database schemas.
- `routes/`: API route definitions.
- `middleware/`: Auth and error handling.
- `utils/`: Helper functions.

### Setup
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and configure it.
4. `npm run dev` to start the server.

## Frontend

### Tech Stack
- **React** (Vite)
- **Tailwind CSS v4**
- **Axios**

### Directory Structure (Atomic Design)
- `components/atoms/`: Basic building blocks (Buttons, Inputs).
- `components/molecules/`: Groups of atoms (FormFields).
- `components/organisms/`: Complex sections (Header, JobCard).
- `components/templates/`: Page layouts.
- `pages/`: Route components.
- `context/`: Global state management.
- `services/`: API calls.

### Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev` to start the development server.

## Naming Conventions
- **Files**: camelCase (e.g., `userController.js`), PascalCase for React components (e.g., `Button.jsx`).
- **Directories**: camelCase.
