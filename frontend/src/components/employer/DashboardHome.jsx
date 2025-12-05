import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Briefcase, Eye, TrendingUp } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend }) => (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-slate-400">{label}</p>
                <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
            </div>
            <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
                <Icon className="h-6 w-6" />
            </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-emerald-400 font-medium">+{trend}%</span>
            <span className="text-slate-500">vs last month</span>
        </div>
    </div>
);

const DashboardHome = () => {
    const data = [
        { name: 'Mon', apps: 4 },
        { name: 'Tue', apps: 7 },
        { name: 'Wed', apps: 15 },
        { name: 'Thu', apps: 10 },
        { name: 'Fri', apps: 23 },
        { name: 'Sat', apps: 5 },
        { name: 'Sun', apps: 8 },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Overview</h1>
                <p className="text-slate-400">Track your recruitment progress</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={Briefcase} label="Active Jobs" value="12" trend="8" />
                <StatCard icon={Users} label="Total Applicants" value="1,245" trend="12" />
                <StatCard icon={Eye} label="Job Views" value="8.5k" trend="24" />
                <StatCard icon={TrendingUp} label="Hire Rate" value="15%" trend="2" />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Chart */}
                <div className="rounded-2xl border border-white/5 bg-white/5 p-6 lg:col-span-2">
                    <h3 className="mb-6 text-lg font-bold text-white">Application Trends</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="name" stroke="#64748b" />
                                <YAxis stroke="#64748b" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="apps" stroke="#3b82f6" fillOpacity={1} fill="url(#colorApps)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
                    <h3 className="mb-6 text-lg font-bold text-white">Recent Activity</h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex gap-4">
                                <div className="h-2 w-2 mt-2 rounded-full bg-blue-500"></div>
                                <div>
                                    <p className="text-sm text-slate-300">New application for <span className="font-bold text-white">Frontend Dev</span></p>
                                    <p className="text-xs text-slate-500">2 minutes ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
