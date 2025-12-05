import { useJobs } from '../../context/JobContext';
import JobCard from './JobCard';

const JobGrid = () => {
    const { jobs, loading } = useJobs();

    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-48 w-full animate-pulse rounded-2xl bg-white/5 border border-white/5"></div>
                ))}
            </div>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
                <h3 className="text-lg font-bold text-white">No jobs found</h3>
                <p className="text-slate-400">Try adjusting your filters or search terms.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    );
};

export default JobGrid;
