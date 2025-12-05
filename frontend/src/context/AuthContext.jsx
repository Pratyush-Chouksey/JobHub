import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../api/auth.service';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on mount
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await authService.getMe();
                    if (res.success) {
                        setUser(res.data); // backend returns { success: true, data: user }
                    }
                } catch (error) {
                    console.error('Auth check failed', error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await authService.login(email, password);
            if (res.success) {
                setUser(res.user || res.data); // Depends on backend structure, assuming user object is returned
                return true;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const register = async (data) => {
        try {
            const res = await authService.register(data);
            if (res.success) {
                setUser(res.user || res.data);
                return true;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        toast.success('Logged out successfully');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading, isAuthenticated: !!user }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
