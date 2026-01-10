// Verify.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Loader2, ArrowLeft, RefreshCw } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Verify = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(60); // resend cooldown
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('pendingEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      // If no pending email, redirect to register
      navigate('/register');
    }

    // Auto-focus first input
    inputRefs.current[0]?.focus();
  }, [navigate]);

  // Resend countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (value, index) => {
    if (value.length > 1) return;
    if (value && !/^[a-zA-Z0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.toUpperCase();
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim().replace(/\s/g, '').slice(0, 6);
    
    if (/^[a-zA-Z0-9]{6}$/.test(pasted)) {
      const chars = pasted.toUpperCase().split('');
      setOtp(chars);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 6) return;

    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/verify-otp`, {
        email,
        otp: code,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.removeItem('pendingEmail');

      toast.success('Email verified successfully! Welcome aboard.', {
        duration: 4000,
      });

      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;

    setResending(true);
    setCountdown(60);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/resend-otp`, { email });
      toast.success('New verification code sent!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to resend code');
      setCountdown(0); // allow immediate retry on error
    } finally {
      setResending(false);
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
            <div className="relative bg-gray-900/60 backdrop-blur-2xl border border-gray-800/50 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
              {/* Header */}
              <div className="px-8 pt-10 pb-6 text-center border-b border-gray-800/40">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br from-indigo-600 to-purple-700 mb-6 shadow-lg shadow-indigo-900/40">
                  <Mail size={28} className="text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                  Verify Email
                </h1>
                <p className="text-gray-400">
                  Enter the 6-digit code sent to
                  <br />
                  <span className="text-indigo-400 font-medium">{email || 'your email'}</span>
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-8">
                {/* OTP Inputs */}
                <div   className="flex justify-center gap-3 sm:gap-4"  onPaste={handlePaste} >
                  {otp.map((digit, index) => (
                    <input  key={index}  ref={(el) => (inputRefs.current[index] = el)}   id={`otp-${index}`}  type="text"  maxLength={1} value={digit} onChange={(e) => handleChange(e.target.value, index)} onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold bg-gray-800/50   border border-gray-700 rounded-lg text-white outline-none
                               focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/30
                               transition-all duration-200"  autoComplete="one-time-code" />
                  ))}
                </div>

                {/* Submit Button */}
                <button  type="submit" disabled={loading || otp.join('').length !== 6} className="w-full bg-linear-to-r from-indigo-600 to-purple-700   hover:from-indigo-700 hover:to-purple-800  text-white font-medium py-3.5 rounded-xl  transition-all duration-300 flex items-center justify-center gap-2  shadow-lg shadow-indigo-900/40 disabled:opacity-60" >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    'Verify Email'
                  )}
                </button>

                {/* Resend & Back */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
                  <button type="button"  onClick={handleResend} disabled={resending || countdown > 0} className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 
                             transition-colors disabled:opacity-50 disabled:cursor-not-allowed" >
                    <RefreshCw size={16} className={resending ? 'animate-spin' : ''} />
                    {countdown > 0   ? `Resend in ${countdown}s`  : resending   ? 'Sending...'   : 'Resend Code'}
                  </button>

                  <Link  to="/login" className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"  >
                    <ArrowLeft size={16} />
                    Back to Login
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

export default Verify;