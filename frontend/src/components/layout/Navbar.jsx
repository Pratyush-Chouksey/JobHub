import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';
import { Menu, X, Bell, User, Sun, Moon, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { cn } from '../../utils/cn';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className={cn(
            "fixed top-0 z-50 w-full transition-all duration-300",
            scrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        )}>
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-white">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600"></div>
                    JobHub
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8">
                    <Link to="/jobs" className="text-sm font-medium text-slate-300 hover:text-white transition">Find Jobs</Link>
                    <Link to="/companies" className="text-sm font-medium text-slate-300 hover:text-white transition">Companies</Link>
                    {user?.role === 'employer' && (
                        <Link to="/employer/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition">Employer</Link>
                    )}
                </div>

                {/* Actions */}
                <div className="hidden lg:flex items-center gap-4">
                    {/* Theme Toggle */}
                    <button onClick={toggleTheme} className="p-2 text-slate-400 hover:text-white transition">
                        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>

                    {user ? (
                        <div className="relative">
                            <div className="flex items-center gap-4">
                                <button className="relative p-2 text-slate-400 hover:text-white transition">
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
                                </button>

                                <button
                                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                    className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 p-1 pr-3 hover:bg-white/10 transition"
                                >
                                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
                                        {user.name.charAt(0)}
                                    </div>
                                    <span className="text-sm font-medium text-white">{user.name}</span>
                                </button>
                            </div>

                            {/* Dropdown */}
                            {userDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-white/5 bg-slate-900 p-2 shadow-xl animate-in fade-in zoom-in-95">
                                    <Link to="/profile" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white">
                                        <User className="h-4 w-4" /> Profile
                                    </Link>
                                    <Link to={user.role === 'employer' ? '/employer/dashboard' : '/applications'} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white">
                                        <LayoutDashboard className="h-4 w-4" /> Dashboard
                                    </Link>
                                    <div className="my-1 h-px bg-white/5"></div>
                                    <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition">
                                        <LogOut className="h-4 w-4" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-sm font-bold text-slate-300 hover:text-white">Sign In</Link>
                            <Link to="/register">
                                <Button size="sm">Get Started</Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-white">
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-slate-950 border-b border-white/5 p-6 space-y-4 animate-in slide-in-from-top-4">
                    <Link to="/jobs" className="block text-lg font-bold text-slate-300">Find Jobs</Link>
                    <Link to="/companies" className="block text-lg font-bold text-slate-300">Companies</Link>
                    <div className="h-px bg-white/5 my-4"></div>
                    {user ? (
                        <>
                            <Link to="/profile" className="block text-lg font-bold text-blue-400">My Profile</Link>
                            <button onClick={handleLogout} className="block text-lg font-bold text-red-500">Logout</button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <Link to="/login"><Button variant="secondary" className="w-full">Sign In</Button></Link>
                            <Link to="/register"><Button className="w-full">Get Started</Button></Link>
                        </div>
                    )}
                </div>
            )}

        </nav>
    );
};

export default Navbar;
