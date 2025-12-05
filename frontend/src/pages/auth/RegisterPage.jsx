import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { toast } from 'react-hot-toast';
import { User, Briefcase } from 'lucide-react';

const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [role, setRole] = useState('seeker'); // 'seeker' | 'employer'
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register({ ...formData, role });
            toast.success('Account created!');
            // Redirect based on role
            navigate(role === 'employer' ? '/employer/dashboard' : '/jobs');
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left: Form */}
            <div className="flex w-full flex-col justify-center bg-slate-950 px-8 py-12 lg:w-1/2 lg:px-24">
                <div className="mb-8">
                    <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">JobHub</Link>
                </div>

                <h1 className="mb-2 text-4xl font-bold text-white">Create an account</h1>
                <p className="mb-8 text-slate-400">Start your journey with us.</p>

                {/* Role Toggle */}
                <div className="mb-8 grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => setRole('seeker')}
                        className={`flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition ${role === 'seeker'
                            ? 'border-blue-500 bg-blue-500/10 text-white'
                            : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:bg-slate-900'
                            }`}
                    >
                        <User className="h-6 w-6" />
                        <span className="font-bold">Job Seeker</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('employer')}
                        className={`flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition ${role === 'employer'
                            ? 'border-blue-500 bg-blue-500/10 text-white'
                            : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:bg-slate-900'
                            }`}
                    >
                        <Briefcase className="h-6 w-6" />
                        <span className="font-bold">Employer</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        id="name"
                        label="Full Name"
                        value={name}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        id="email"
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />

                    <Button type="submit" className="w-full" isLoading={loading}>
                        Create Account
                    </Button>
                </form>

                <p className="mt-8 text-center text-sm text-slate-400">
                    Already have an account? <Link to="/login" className="font-bold text-white hover:underline">Log in</Link>
                </p>
            </div>

            {/* Right: Image */}
            <div className="hidden w-1/2 lg:block relative bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-bl from-blue-600/20 to-purple-600/20"></div>
                {/* ... similar art ... */}
            </div>
        </div>
    );
};

export default RegisterPage;
