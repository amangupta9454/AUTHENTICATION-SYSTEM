// ForgotPassword.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/forgot-password`, { email });

      localStorage.setItem('pendingResetEmail', email);
      toast.success(res.data.message || 'Reset code sent to your email', {
        duration: 5000,
      });

      navigate('/verify-reset');
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        (err.code === 'ERR_NETWORK' ? 'Cannot reach server' : 'Failed to send reset code');

      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />

      <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black">
        {/* Navbar spacer */}
        <div className="h-16 md:h-20" aria-hidden="true" />

        <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            <div className="relative bg-gray-900/65 backdrop-blur-2xl border border-gray-800/50 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
              {/* Header */}
              <div className="px-8 pt-10 pb-6 text-center border-b border-gray-800/40">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br from-red-600 to-rose-700 mb-6 shadow-lg shadow-red-900/40">
                  <Mail size={28} className="text-white" />
                </div>

                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                  Reset Your Password
                </h1>

                <p className="text-gray-400">
                  Enter your registered email address and we'll send you a reset code
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-rose-500"/>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value.trim())} placeholder="name@company.com" autoComplete="email" required className="w-full bg-gray-800/50 border border-gray-700/80 text-white  pl-11 pr-4 py-3.5 rounded-xl outline-none focus:border-rose-600 focus:ring-2 focus:ring-rose-600/30 focus:bg-gray-800/60 transition-all duration-300 placeholder:text-gray-500 text-sm" />
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={loading || !email.trim()} className="w-full bg-linear-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-medium py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5shadow-lg shadow-red-900/40 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none">
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending Reset Code...</span>
                    </>
                  ) : (
                    'Send Reset Code'
                  )}
                </button>

                {/* Navigation Links */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm pt-2">
                  <Link to="/login" className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors" >
                    <ArrowLeft size={16} />
                    Back to Login
                  </Link>

                  <Link to="/register" className="text-rose-400 hover:text-rose-300 transition-colors">
                    Don't have an account? Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </main>

        {/* Footer spacer */}
        <div className="h-16 md:h-20" aria-hidden="true" />
      </div>
    </>
  );
};

export default ForgotPassword;