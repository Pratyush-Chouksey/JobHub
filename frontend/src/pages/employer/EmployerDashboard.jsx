import EmployerLayout from '../../components/employer/EmployerLayout';
import DashboardHome from '../../components/employer/DashboardHome';
import JobForm from '../../components/employer/JobForm';
import ApplicantKanban from '../../components/employer/ApplicantKanban';

// Simple prop-based routing for demo purposes
// In production, use <Outlet /> and nested routes
const EmployerDashboard = ({ page = 'dashboard' }) => {
    return (
        <EmployerLayout activePage={page}>
            {page === 'dashboard' && <DashboardHome />}
            {page === 'post-job' && <JobForm />}
            {page === 'applicants' && (
                <div>
                    <h1 className="mb-6 text-2xl font-bold text-white">Application Tracking</h1>
                    <ApplicantKanban />
                </div>
            )}
        </EmployerLayout>
    );
};

export default EmployerDashboard;
