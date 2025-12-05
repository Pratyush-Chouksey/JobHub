import { MapPin, Clock, Bookmark, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    return (
        <div className="group relative flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/5 p-6 transition-all hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10">

            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500 overflow-hidden">
                        {job.company?.logo ? <img src={job.company.logo} alt={job.company.name} className="h-full w-full object-cover" /> : <Building2 size={24} />}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{job.title}</h3>
                        <p className="text-sm font-medium text-slate-400">{job.company?.name || 'Company Confidential'}</p>
                    </div>
                </div>
                <button className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition">
                    <Bookmark size={20} />
                </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-300">
                <span className="rounded-full bg-white/5 px-3 py-1 flex items-center gap-1">
                    <MapPin size={12} /> {job.location}
                </span>
                <span className="rounded-full bg-white/5 px-3 py-1">
                    {job.type}
                </span>
                <span className="rounded-full bg-emerald-500/10 text-emerald-400 px-3 py-1 border border-emerald-500/20">
                    ${job.salary}
                </span>
            </div>

            {/* Footer */}
            <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock size={12} /> {new Date(job.createdAt).toLocaleDateString()}
                </span>
                {/* Link to Job Details Page (to be built or using same listing for now) */}
                <Link to={`/jobs/${job._id}`} className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-slate-900 hover:bg-slate-200 transition">
                    Apply Now
                </Link>
            </div>

        </div>
    );
};

export default JobCard;
