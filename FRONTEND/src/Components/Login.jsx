// Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, Loader2, Mail, Lock, LogIn, Trophy, Zap, Users } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful', { duration: 3000 });
      setTimeout(() => navigate('/dashboard'), 700);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Invalid credentials', { duration: 4500 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />

      <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black">
        {/* Main content with proper top/bottom padding to respect navbar & footer */}
        <div className="min-h-screen flex flex-col">
          {/* Spacer for fixed navbar (adjust height according to your navbar) */}
          <div className="h-16 md:h-20" aria-hidden="true" />

          <main className="flex-1 flex items-center justify-center py-8 md:py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* LEFT COLUMN - Promotional / Branding Content */}
                <div className="hidden lg:flex flex-col justify-center space-y-10">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50">
                      <Zap size={20} className="text-blue-500" />
                      <span className="text-blue-400 font-medium text-sm">AI-CAREER COACH</span>
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-bold leading-tight bg-linear-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                      Welcome Back,
                      <br />
                      <span className="text-blue-500">Innovator!</span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-lg">
                      Join our community of tech enthusiasts and take your skills to the next level with AI-powered interview preparation and career growth tools.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-900/40">
                        <Trophy size={24} className="text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">AI-Powered Career Growth</h3>
                        <p className="text-gray-400 text-sm mt-1">
                          Personalized interview practice & feedback
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-900/40">
                        <Zap size={24} className="text-indigo-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Exciting Competitions</h3>
                        <p className="text-gray-400 text-sm mt-1">
                          Participate in cutting-edge tech challenges
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-green-950/40 border border-green-900/40">
                        <Users size={24} className="text-green-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Network & Collaborate</h3>
                        <p className="text-gray-400 text-sm mt-1">
                          Connect with fellow tech enthusiasts
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN - Login Form */}
                <div className="w-full max-w-md mx-auto lg:mx-0">
                  <div className="bg-gray-900/60 backdrop-blur-2xl border border-gray-800/50 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
                    {/* Mobile-only heading */}
                    <div className="lg:hidden px-8 pt-10 pb-6 text-center border-b border-gray-800/40">
                      <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                      <p className="text-gray-400 mt-2">Sign in to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-6">
                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                          Email address
                        </label>
                        <div className="relative group">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-blue-500" size={18} />
                          <input  id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" className="w-full bg-gray-800/40 border border-gray-700/80 text-white pl-11 pr-4 py-3.5 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30 transition-all"  required />
                        </div>
                      </div>

                      {/* Password */}
                      <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-300 block">
                          Password
                        </label>
                        <div className="relative group">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-blue-500" size={18} />
                          <input   id="password"   type={showPassword ? 'text' : 'password'}   value={password}   onChange={(e) => setPassword(e.target.value)}   placeholder="••••••••"   className="w-full bg-gray-800/40 border border-gray-700/80 text-white pl-11 pr-12 py-3.5 rounded-xl  focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30 transition-all"
                            required  />
                          <button   type="button"   onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300" >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                          Forgot password?
                        </Link>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/40 disabled:opacity-60"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center gap-2">
                            <Loader2 size={18} className="animate-spin" />
                            <span>Signing in...</span>
                          </div>
                        ) : (
                          'Sign In'
                        )}
                      </button>

                      <p className="text-center text-sm text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                          Create account
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Spacer for footer */}
          <div className="h-16 md:h-20" aria-hidden="true" />
        </div>
      </div>
    </>
  );
};

export default Login;