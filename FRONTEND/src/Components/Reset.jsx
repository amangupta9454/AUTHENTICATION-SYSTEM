// yh components tb render hoga jb tum forget password kroge aur usme tum new password daloge

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Key, Eye, EyeOff, Loader } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Reset = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      const token = localStorage.getItem('resetToken');
      await axios.post(`${import.meta.env.VITE_API_URL}/reset-password`,
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem('resetToken');
      localStorage.removeItem('pendingResetEmail');
      toast.success('Password reset successful!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <style>{`
        .reset-container { min-height: 100vh; display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1rem; }
        .reset-card { background: white; padding: 3rem; border-radius: 1.5rem; box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          width: 100%; max-width: 440px; animation: slideUp 0.5s ease-out; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .reset-header { display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 2rem;
          font-size: 2rem; font-weight: 700; color: #1a202c; }
        .password-wrapper { position: relative; margin-bottom: 1.25rem; }
        .reset-input { width: 100%; padding: 1rem; border: 2px solid #e2e8f0; border-radius: 0.75rem;
          font-size: 1rem; transition: all 0.3s; outline: none; padding-right: 3rem; }
        .reset-input:focus { border-color: #667eea; box-shadow: 0 0 0 3px rgba(102,126,234,0.1); }
        .password-toggle { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer; color: #667eea; }
        .reset-button { width: 100%; padding: 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white; border: none; border-radius: 0.75rem; font-size: 1rem; font-weight: 600;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer; }
        .reset-button:disabled { opacity: 0.7; cursor: not-allowed; }
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <div className="reset-container">
        <form onSubmit={handleSubmit} className="reset-card">
          <h2 className="reset-header"><Key size={32} /> Reset Password</h2>

          <div className="password-wrapper">
            <input type={showNew ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password" className="reset-input" required />
            <button type="button" onClick={() => setShowNew(!showNew)} className="password-toggle">
              {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="password-wrapper">
            <input type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password" className="reset-input" required />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="password-toggle">
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="reset-button" disabled={loading}>
            {loading && <Loader size={20} className="spinner" />}
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Reset;