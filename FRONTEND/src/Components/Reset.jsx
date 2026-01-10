// Reset.jsx
// Rendered when user comes from Forgot Password → Verify → Reset flow

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { KeyRound, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Reset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("resetToken");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/reset-password`,
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.removeItem("resetToken");
      localStorage.removeItem("pendingResetEmail");

      toast.success("Password updated successfully");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.error || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      {/* Page Wrapper */}
      <div className="min-h-screen pt-28 pb-28 flex items-center justify-center bg-[#0B0E14] relative overflow-hidden">
        {/* Subtle grid / AI background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#1f2933_1px,transparent_0)] bg-size-[32px_32px] opacity-[0.25]" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black" />

        {/* Card */}
        <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/4 backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.9)] px-6 sm:px-10 pt-14 pb-12 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="h-14 w-14 rounded-xl flex items-center justify-center bg-white/5 border border-white/10">
              <ShieldCheck className="text-neutral-200" size={28} />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2">
            Set a new password
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-10">
            Choose a strong password to secure your account
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New password */}
            <div className="relative">
              <KeyRound   size={18}  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"  />
              <input  type={showNew ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}  placeholder="New password"
                required   className="w-full h-12 rounded-xl bg-black/40 border border-white/10 pl-11 pr-12 text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 focus:bg-black/60 transition"  />
              <button  type="button"   onClick={() => setShowNew(!showNew)}  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 transition" >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm password */}
            <div className="relative">
              <KeyRound   size={18}   className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"  />
              <input   type={showConfirm ? "text" : "password"}   value={confirmPassword}   onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password"  required  className="w-full h-12 rounded-xl bg-black/40 border border-white/10 pl-11 pr-12 text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 focus:bg-black/60 transition"
              />
              <button   type="button"  onClick={() => setShowConfirm(!showConfirm)}  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 transition" >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Submit */}
            <button   type="submit"   disabled={loading}  className="w-full h-12 rounded-xl bg-white text-black font-medium tracking-wide shadow-md hover:bg-neutral-200 active:scale-[0.98] transition flex items-center justify-center gap-2 disabled:opacity-70" >
              {loading && <Loader2 size={20} className="animate-spin" />}
              {loading ? "Updating…" : "Update password"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-10 text-sm text-neutral-500">
            Remember your password?{" "}
            <span  onClick={() => navigate("/login")}  className="cursor-pointer text-neutral-300 hover:text-white transition" >
              Back to sign in
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Reset;
