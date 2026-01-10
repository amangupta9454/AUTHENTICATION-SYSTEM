// yh jo components tb render hoga jb user forget password krke uske email ppr jo otp code jayega usko verify krne ke liye use hoga

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Loader } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const VerifyReset = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('pendingResetEmail');
    if (saved) setEmail(saved);
  }, []);

  const handleChange = (value, index) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim().slice(0, 6);
    if (/^[a-zA-Z0-9]{6}$/.test(pasted)) {
      setOtp(pasted.split(''));
      document.getElementById('otp-5')?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const code = otp.join('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/verify-reset-otp`, { email, otp: code });
      localStorage.setItem('resetToken', res.data.token);
      toast.success('OTP verified!');
      setTimeout(() => navigate('/reset-password'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/forgot-password`, { email });
      toast.success('New code sent!');
    } catch (err) {
      toast.error('Failed to resend');
    } finally {
      setResending(false);
    }
  };

  return (
   
    <>
  <Toaster position="top-right" />

  {/* Page background */}
  <div className=" min-h-screen pt-28 pb-28  flex items-center justify-center  bg-[#0B0E14]  relative overflow-hidden ">

    {/* Background grid / noise */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#1f2933_1px,transparent_0)] bg-size-[32px_32px] opacity-[0.25]" />
    <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black" />

    {/* Card */}
    <div
      className="  relative z-10  w-full max-w-md sm:max-w-lg  rounded-3xl  border border-white/10  bg-white/4  backdrop-blur-xl  shadow-[0_30px_120px_rgba(0,0,0,0.9)]  px-6 sm:px-10  pt-16 pb-12 text-center " >

      {/* Icon */}
      <div className="flex justify-center mb-8">
        <div className="  h-14 w-14 flex items-center justify-center  rounded-xl  bg-white/5  border border-white/10 ">
          <Mail size={28} className="text-neutral-200" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2">
        Verify your identity
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-10">
        Enter the 6-digit verification code sent to
        <br />
        <span className="text-neutral-200 font-medium">{email}</span>
      </p>

      {/* OTP */}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center gap-2 sm:gap-3 mb-10" onPaste={handlePaste} >
          {otp.map((digit, i) => (
            <input  key={i}  id={`otp-${i}`}  type="text"  maxLength="1" value={digit}  onChange={(e) => handleChange(e.target.value, i)} required className="  w-11 h-12 sm:w-12 sm:h-14 rounded-xl  bg-black/40  border border-white/10 text-center  text-xl font-medium  text-white  placeholder-neutral-600 focus:outline-none  focus:border-white/30  focus:bg-black/60 transition " /> ))}
        </div>

        {/* Submit */}
        <button  type="submit"  disabled={loading} className="  w-full h-12  rounded-xl
            bg-white text-black  font-medium  tracking-wide
            shadow-md  hover:bg-neutral-200 active:scale-[0.98]  transition
            flex items-center justify-center gap-2 " >
          {loading && <Loader size={20} className="animate-spin" />}
          Confirm code
        </button>
      </form>

      {/* Resend */}
      <button  onClick={handleResend}  className="  mt-6  text-sm  text-neutral-400  hover:text-neutral-200  transition " >
        {resending ? "Sending new code…" : "Resend verification code"}
      </button>

      {/* Divider */}
      <div className="mt-10 h-px bg-white/10" />

      {/* Back */}
      <p className="mt-6 text-sm text-neutral-500">
        <Link  to="/login"  className="hover:text-neutral-300 transition">
          ← Back to sign in
        </Link>
      </p>
    </div>
  </div>
</>

  );
};

export default VerifyReset;