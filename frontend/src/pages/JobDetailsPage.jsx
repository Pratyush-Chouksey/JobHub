import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Building2, Briefcase, DollarSign, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { Button } from '../components/ui/Button';
import ApplicationModal from '../components/jobs/ApplicationModal';
// import { useAuth } from '../context/AuthContext'; // Might need this to conditionally show apply button?

const JobDetailsPage = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/jobs/${id}`);
                setJob(res.data.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load job details');
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 text-white">
                <p>{error || 'Job not found'}</p>
                <Link to="/jobs" className="text-blue-500 hover:underline">
                    Back to Jobs
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 pb-20 pt-20">
            <div className="container mx-auto px-4">
                <Link to="/jobs" className="mb-6 inline-flex items-center gap-2 text-slate-400 hover:text-white transition">
                    <ArrowLeft size={20} />
                    Back to Jobs
                </Link>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Header */}
                        <div className="rounded-2xl border border-white/5 bg-white/5 p-8">
                            <div className="mb-6 flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-600/20 text-blue-500 overflow-hidden">
                                        {job.company?.logo ? (
                                            <img src={job.company.logo} alt={job.company.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <Building2 size={32} />
                                        )}
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-white">{job.title}</h1>
                                        <p className="text-lg text-slate-400">{job.company?.name || 'Company Confidential'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-sm text-slate-300">
                                    <MapPin size={14} /> {job.location}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-sm text-slate-300">
                                    <Briefcase size={14} /> {job.type}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400 border border-emerald-500/20">
                                    <DollarSign size={14} />
                                    {typeof job.salary === 'object'
                                        ? `${job.salary.currency || '$'}${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}`
                                        : job.salary}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-sm text-slate-500">
                                    <Clock size={14} /> Posted {new Date(job.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="rounded-2xl border border-white/5 bg-white/5 p-8">
                            <h2 className="mb-4 text-xl font-bold text-white">Job Description</h2>
                            <div className="prose prose-invert max-w-none text-slate-300">
                                <p>{job.description}</p>
                            </div>
                        </div>

                        {/* Requirements */}
                        {job.requirements && (
                            <div className="rounded-2xl border border-white/5 bg-white/5 p-8">
                                <h2 className="mb-4 text-xl font-bold text-white">Requirements</h2>
                                <div className="prose prose-invert max-w-none text-slate-300">
                                    <p>{job.requirements}</p>
                                    {/* If requirements is an array, map it. Assuming string based on previous usage or description block style */}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
                            <h3 className="mb-4 text-lg font-bold text-white">Apply for this position</h3>
                            <p className="mb-6 text-sm text-slate-400">
                                Ready to take the next step in your career? Submit your application now.
                            </p>
                            <Button
                                className="w-full"
                                size="lg"
                                onClick={() => setIsApplyModalOpen(true)}
                            >
                                Apply Now
                            </Button>
                        </div>

                        {/* Company Info could go here */}
                    </div>
                </div>
            </div>

            <ApplicationModal
                isOpen={isApplyModalOpen}
                onClose={() => setIsApplyModalOpen(false)}
                job={job}
            />
        </div>
    );
};

export default JobDetailsPage;
