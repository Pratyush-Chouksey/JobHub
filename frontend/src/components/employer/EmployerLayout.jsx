import { LayoutDashboard, PlusCircle, Briefcase, Users, Settings, LogOut } from 'lucide-react';
import Navbar from '../landing/Navbar';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${active
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
    >
        <Icon className="h-5 w-5" />
        {label}
    </button>
);

const EmployerLayout = ({ children, activePage = 'dashboard' }) => {
    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30">
            <Navbar />

            <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-white/5 bg-slate-900/50 p-6 backdrop-blur-xl lg:flex pt-24">

                {/* Company Profile Snippet */}
                <div className="mb-8 flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4">
                    <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white">
                        TC
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white">Tech Corp</h3>
                        <p className="text-xs text-slate-400">Employer Account</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activePage === 'dashboard'} />
                    <SidebarItem icon={PlusCircle} label="Post a Job" active={activePage === 'post-job'} />
                    <SidebarItem icon={Briefcase} label="My Jobs" active={activePage === 'jobs'} />
                    <SidebarItem icon={Users} label="Applicants" active={activePage === 'applicants'} />
                    <div className="mt-8 border-t border-white/5 pt-4">
                        <SidebarItem icon={Settings} label="Company Settings" />
                        <SidebarItem icon={LogOut} label="Log Out" />
                    </div>
                </nav>
            </aside>

            <main className="pt-24 lg:pl-64 min-h-screen">
                <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default EmployerLayout;
