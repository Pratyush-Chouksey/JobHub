import Navbar from '../components/landing/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import SearchBar from '../components/jobs/SearchBar';
import Filters from '../components/jobs/Filters';
import JobGrid from '../components/jobs/JobGrid';
import { JobProvider } from '../context/JobContext';

const JobBoard = () => {
    return (
        <JobProvider>
            <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30">
                <Navbar />

                <Sidebar />

                <main className="pt-24 lg:pl-64 min-h-screen">
                    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">

                        <div className="mb-6">
                            <h1 className="text-3xl font-bold tracking-tight text-white">Find your next role</h1>
                            <p className="text-slate-400">Search through 12,000+ active job listings</p>
                        </div>

                        <SearchBar />

                        <div className="flex gap-8">
                            <Filters />
                            <div className="flex-1">
                                <JobGrid />
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </JobProvider>
    );
};

export default JobBoard;
