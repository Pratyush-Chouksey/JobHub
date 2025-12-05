import { LayoutDashboard, Bookmark, Settings, FileText, Bell } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, to }) => (
    <NavLink
        to={to}
        className={({ isActive }) => `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${isActive
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
            : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
    >
        <Icon className="h-5 w-5" />
        {label}
    </NavLink>
);

const Sidebar = () => {
    return (
        <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-white/5 bg-slate-900/50 p-6 backdrop-blur-xl lg:flex pt-24">

            {/* User Profile Snippet */}
            <NavLink to="/profile" className="mb-8 flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 hover:bg-white/10 transition-colors">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
                <div>
                    <h3 className="text-sm font-bold text-white">Alex Johnson</h3>
                    <p className="text-xs text-slate-400">Software Engineer</p>
                </div>
            </NavLink>

            {/* Navigation */}
            <nav className="flex flex-col gap-2">
                <SidebarItem icon={LayoutDashboard} label="Find Jobs" to="/jobs" />
                <SidebarItem icon={Bookmark} label="Saved Jobs" to="/saved-jobs" />
                <SidebarItem icon={FileText} label="Applications" to="/applications" />
                <SidebarItem icon={Bell} label="Alerts" to="/alerts" />
                <SidebarItem icon={Settings} label="Settings" to="/settings" />
            </nav>

            {/* Stats */}
            <div className="mt-auto rounded-2xl bg-blue-900/20 p-4 border border-blue-500/20">
                <h4 className="mb-2 text-xs font-bold uppercase text-blue-400">Your Stats</h4>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Applied</span>
                    <span className="font-bold text-white">12</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-300">Viewed</span>
                    <span className="font-bold text-white">45</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
