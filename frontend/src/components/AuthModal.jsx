import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Eye, EyeOff, Mail, Lock, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthModal = () => {
    const { isModalOpen, closeModal, login, signup, loading, error: authError } = useAuth();
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
    const [showPassword, setShowPassword] = useState(false);

    // Form inputs state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    if (!isModalOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLogin) {
            const result = await login(email, password);
            if (result.success) {
                // Success handled in context (modal closes, user set)
                toast.success("Successfully logged in!");
            } else {
                toast.error(result.message || "Login failed");
            }
        } else {
            const result = await signup(name, email, password);
            if (result.success) {
                toast.success(result.message);
                setIsLogin(true); // Switch to login after successful signup
            } else {
                toast.error(result.message || "Signup failed");
            }
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop with Blur */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={closeModal}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-4xl bg-[#1a1a1a]  overflow-hidden shadow-2xl flex flex-col md:flex-row h-[700px] border border-zinc-800 animate-in fade-in zoom-in duration-300">

                {/* Close Button Mobile (Top Right) */}
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white md:hidden"
                >
                    <X size={24} />
                </button>

                {/* Left Side - Branding / Visual */}
                <div className="hidden md:flex md:w-1/2 bg-zinc-900 relative items-center justify-center overflow-hidden">
                    {/* Background Gradient Only */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF5F1F]/20 to-transparent"></div>

                    {/* Content */}
                    <div className="relative z-10 text-center p-8">
                        <h2 className="text-5xl font-black uppercase tracking-tighter text-white mb-4 drop-shadow-2xl">
                            Steam<span className="text-[#FF5F1F]">HUB</span>
                        </h2>
                        <p className="text-gray-300 text-lg font-light tracking-wide">
                            Your gateway to the ultimate gaming experience.
                        </p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#FF5F1F] rounded-full blur-[100px] opacity-20"></div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#121212] relative">
                    <button
                        onClick={closeModal}
                        className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors hidden md:block"
                    >
                        <X size={24} />
                    </button>

                    <div className="max-w-md mx-auto w-full">
                        <h3 className="text-3xl font-bold text-white mb-2">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h3>
                        <p className="text-gray-400 mb-8">
                            {isLogin
                                ? 'Enter your details to access your library.'
                                : 'Join the community and start playing.'}
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Full Name Field with smooth transition */}
                            <div className={`space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${isLogin ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'}`}>
                                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                        <UserIcon size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        required={!isLogin}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-[#1e1e1e] border border-zinc-800 focus:border-[#FF5F1F] rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-[#1e1e1e] border border-zinc-800 focus:border-[#FF5F1F] rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 outline-none transition-all"
                                        placeholder="name@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-[#1e1e1e] border border-zinc-800 focus:border-[#FF5F1F] rounded-lg py-3 pl-10 pr-12 text-white placeholder-gray-600 outline-none transition-all"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {isLogin && (
                                    <div className="flex justify-end">
                                        <a href="#" className="text-xs text-[#FF5F1F] hover:text-[#ff7f4d] transition-colors">
                                            Forgot password?
                                        </a>
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-[#FF5F1F] hover:bg-[#e0480b] text-white font-bold py-3.5 rounded-lg transition-all transform hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(255,95,31,0.4)] mt-4 flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    isLogin ? 'Log In' : 'Sign Up'
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-400">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-white font-bold hover:text-[#FF5F1F] transition-colors"
                                >
                                    {isLogin ? 'Sign up' : 'Log in'}
                                </button>
                            </p>
                        </div>

                        {/* Social Login Section */}
                        <div className="mt-8 flex flex-col gap-4">
                            <div className="relative flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-zinc-800"></div>
                                </div>
                                <div className="relative bg-[#121212] px-4 text-[10px] uppercase text-gray-500 font-bold tracking-wider">
                                    Or continue with
                                </div>
                            </div>

                            <button
                                type="button"
                                className="relative w-full bg-white hover:bg-gray-100 text-black font-bold py-3.5 rounded-lg transition-all transform hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-3 group"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span>Continue with Google</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
