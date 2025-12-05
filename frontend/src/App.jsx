import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async'; // SEO
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ui/ErrorBoundary';

import LandingPage from './pages/LandingPage';
import JobBoard from './pages/JobBoard';
import EmployerDashboard from './pages/employer/EmployerDashboard';
import ProfilePage from './pages/profile/ProfilePage';
import ResumeBuilder from './components/resume/ResumeBuilder';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

function App() {
    return (
        <ErrorBoundary>
            <HelmetProvider>
                <ThemeProvider>
                    <AuthProvider>
                        <Router>
                            <Toaster
                                position="top-right"
                                toastOptions={{
                                    style: {
                                        background: '#0f172a',
                                        color: '#fff',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                    },
                                }}
                            />
                            <Routes>
                                <Route path="/" element={<LandingPage />} />

                                {/* Auth */}
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />

                                <Route path="/jobs" element={<JobBoard />} />

                                {/* Employer Routes */}
                                <Route path="/employer/dashboard" element={<EmployerDashboard page="dashboard" />} />
                                <Route path="/employer/post-job" element={<EmployerDashboard page="post-job" />} />
                                <Route path="/employer/applicants" element={<EmployerDashboard page="applicants" />} />

                                {/* User Routes */}
                                <Route path="/profile" element={<ProfilePage />} />
                                <Route path="/resume-builder" element={<ResumeBuilder />} />
                            </Routes>
                        </Router>
                    </AuthProvider>
                </ThemeProvider>
            </HelmetProvider>
        </ErrorBoundary>
    );
}

export default App;
