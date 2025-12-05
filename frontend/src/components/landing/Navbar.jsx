import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Briefcase } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isLandingPage = location.pathname === '/';

    const getLink = (hash) => isLandingPage ? hash : `/${hash}`;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'glass border-b border-white/5 py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-500">
                        <Briefcase className="h-6 w-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">JobHub</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden items-center gap-8 md:flex">
                    <a href={getLink('#features')} className="text-sm font-medium text-slate-300 transition hover:text-white">Features</a>
                    <a href={getLink('#how-it-works')} className="text-sm font-medium text-slate-300 transition hover:text-white">How it Works</a>
                    <a href={getLink('#testimonials')} className="text-sm font-medium text-slate-300 transition hover:text-white">Stories</a>
                    <div className="flex items-center gap-4 pl-4">
                        <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white">Log in</Link>
                        <Link to="/register" className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-500 hover:shadow-blue-500/40">
                            Sign Up
                        </Link>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full glass border-b border-white/5 bg-slate-900/90 p-6 md:hidden">
                    <div className="flex flex-col space-y-4">
                        <a href={getLink('#features')} className="text-slate-300 hover:text-white" onClick={() => setIsOpen(false)}>Features</a>
                        <a href={getLink('#how-it-works')} className="text-slate-300 hover:text-white" onClick={() => setIsOpen(false)}>How it Works</a>
                        <Link to="/login" className="w-full rounded-lg bg-white/10 py-3 text-center text-white" onClick={() => setIsOpen(false)}>Log in</Link>
                        <Link to="/register" className="w-full rounded-lg bg-blue-600 py-3 text-center text-white" onClick={() => setIsOpen(false)}>Sign up</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
