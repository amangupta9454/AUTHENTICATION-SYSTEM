import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, Eye, EyeOff, Loader2, Mail, Lock, User } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (avatar) formData.append('avatar', avatar);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      localStorage.setItem('pendingEmail', email);
      toast.success(res.data.message || 'Verification code sent to your email!');
      navigate('/verify');
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        err.message === 'Network Error' ? 'Cannot connect to server' :
        'Registration failed';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />

      <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black">
        {/* Spacer for navbar */}
        <div className="h-16 md:h-20" aria-hidden="true" />

        <main className="flex-1 flex items-center justify-center py-8 md:py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* LEFT - Promotional Content */}
              <div className="hidden lg:flex flex-col justify-center space-y-10">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50">
                    <UserPlus size={20} className="text-indigo-500" />
                    <span className="text-indigo-400 font-medium text-sm">JOIN AI-CAREER COACH</span>
                  </div>

                  <h1 className="text-5xl lg:text-6xl font-bold leading-tight bg-linear-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                    Start Your
                    <br />
                    <span className="text-indigo-500">Journey</span>
                  </h1>

                  <p className="text-xl text-gray-400 max-w-lg">
                    Create your account and unlock AI-powered tools to elevate your tech career.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-900/40">
                      <UserPlus size={24} className="text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Get Started Fast</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        Simple registration with email verification
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-900/40">
                      <Mail size={24} className="text-purple-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Secure Account</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        Protected with modern authentication
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-pink-950/40 border border-pink-900/40">
                      <User size={24} className="text-pink-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Personal Profile</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        Add your avatar and stand out
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT - Registration Form */}
              <div className="w-full max-w-md mx-auto lg:mx-0">
                <div className="bg-gray-900/60 backdrop-blur-2xl border border-gray-800/50 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
                  {/* Mobile heading */}
                  <div className="lg:hidden px-8 pt-10 pb-6 text-center border-b border-gray-800/40">
                    <h2 className="text-3xl font-bold text-white">Create Account</h2>
                    <p className="text-gray-400 mt-2">Join the future of tech today</p>
                  </div>

                  <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-6">
                    {/* Avatar */}
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative w-28 h-28 rounded-full overflow-hidden bg-linear-to-br from-indigo-600 to-purple-600 border-4 border-indigo-500/30 shadow-xl">
                        {avatarPreview ? (
                          <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/70">
                            <User size={48} />
                          </div>
                        )}
                      </div>

                      <label className="cursor-pointer">
                        <input  type="file"  accept="image/*" onChange={handleAvatarChange}
                          className="hidden" />
                        <span className="px-5 py-2.5 bg-gray-800/70 border border-gray-700 rounded-lg text-indigo-400 hover:bg-indigo-900/40 hover:text-indigo-300 transition-colors text-sm font-medium">
                          Choose Profile Picture
                        </span>
                      </label>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-300 block">
                        Full Name
                      </label>
                      <div className="relative group">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-indigo-500" size={18} />
                        <input  id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}  placeholder="John Doe" className="w-full bg-gray-800/40 border border-gray-700/80 text-white pl-11 pr-4 py-3.5 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/30 transition-all" required  />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                        Email address
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-indigo-500" size={18} />
                        <input  id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="name@company.com" className="w-full bg-gray-800/40 border border-gray-700/80 text-white pl-11 pr-4 py-3.5 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/30 transition-all"
                          required />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium text-gray-300 block">
                        Password
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-indigo-500" size={18} />
                        <input id="password" type={showPassword ? 'text' : 'password'}
                          value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-gray-800/40 border border-gray-700/80 text-white pl-11 pr-12 py-3.5 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/30 transition-all" required />
                        <button   type="button"   onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"  >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}   className="w-full bg-linear-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-900/40 disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </button>

                    <p className="text-center text-sm text-gray-400">
                      Already have an account?{' '}
                      <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                        Sign in
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
    </>
  );
};

export default Register;