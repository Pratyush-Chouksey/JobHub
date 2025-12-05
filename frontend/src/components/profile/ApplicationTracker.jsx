import { useState } from 'react';
import { Search, MoreVertical, Building2, MapPin, Calendar, XCircle, Info } from 'lucide-react';

const StatusBadge = ({ status }) => {
    const styles = {
        Pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        Reviewed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        Shortlisted: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
        Rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
        Hired: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    };
    return (
        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${styles[status] || styles.Pending}`}>
            {status}
        </span>
    );
};

const ApplicationTracker = () => {
    const [filter, setFilter] = useState('All');
    const [applications, setApplications] = useState([
        { id: 1, role: 'Senior React Dev', company: 'TechFlow', status: 'Pending', date: '2 days ago', logo: '' },
        { id: 2, role: 'Product Designer', company: 'Creative Inc', status: 'Reviewed', date: '5 days ago', logo: '' },
        { id: 3, role: 'Backend Engineer', company: 'DataSystems', status: 'Rejected', date: '1 week ago', logo: '' },
        { id: 4, role: 'Frontend Lead', company: 'Startup', status: 'Shortlisted', date: '2 weeks ago', logo: '' },
    ]);

    const filteredApps = filter === 'All' ? applications : applications.filter(app => app.status === filter);

    return (
        <div className="space-y-6">
            {/* Header & Filter */}
            <div className="flex flex-col flex-wrap gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    {['All', 'Pending', 'Reviewed', 'Shortlisted', 'Rejected'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`rounded-xl px-4 py-2 text-sm font-medium transition whitespace-nowrap ${filter === status ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search apps..."
                        className="rounded-xl border border-white/5 bg-slate-900 px-4 py-2 pl-10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* List */}
            <div className="grid gap-4">
                {filteredApps.map(app => (
                    <div key={app.id} className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 transition hover:border-blue-500/30">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-400">
                                    <Building2 className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">{app.role}</h3>
                                    <p className="text-sm text-slate-400">{app.company}</p>
                                </div>
                            </div>
                            <StatusBadge status={app.status} />
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-white/5 pt-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Applied {app.date}</span>
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Remote</span>
                        </div>

                        {/* Actions */}
                        <div className="absolute right-4 bottom-4 opacity-0 transition group-hover:opacity-100 flex gap-2">
                            <button className="rounded-lg bg-white/10 p-2 text-slate-300 hover:bg-red-500/20 hover:text-red-400" title="Withdraw">
                                <XCircle className="h-4 w-4" />
                            </button>
                            <button className="rounded-lg bg-white/10 p-2 text-slate-300 hover:bg-blue-500/20 hover:text-blue-400" title="Notes">
                                <Info className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApplicationTracker;
