import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password, 'seeker'); // Default to seeker for demo
            toast.success('Welcome back!');
            navigate('/jobs');
        } catch (error) {
            toast.error('Invalid credentials');
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

                <h1 className="mb-2 text-4xl font-bold text-white">Welcome back</h1>
                <p className="mb-8 text-slate-400">Please enter your details to sign in.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        id="email"
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded border-slate-700 bg-slate-900 text-blue-600" />
                            <span className="text-sm text-slate-400">Remember for 30 days</span>
                        </label>
                        <Link to="/forgot-password" class="text-sm font-bold text-blue-500 hover:text-blue-400">Forgot password?</Link>
                    </div>

                    <Button type="submit" className="w-full" isLoading={loading}>Sign In</Button>
                </form>

                <p className="mt-8 text-center text-sm text-slate-400">
                    Don't have an account? <Link to="/register" className="font-bold text-white hover:underline">Sign up</Link>
                </p>
            </div>

            {/* Right: Image */}
            <div className="hidden w-1/2 lg:block relative bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20"></div>
                <div className="absolute inset-0 flex items-center justify-center p-20">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Find your dream job today.</h2>
                        <p className="text-slate-300 text-lg">Join thousands of professionals and top companies on the world's leading recruitment platform.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
