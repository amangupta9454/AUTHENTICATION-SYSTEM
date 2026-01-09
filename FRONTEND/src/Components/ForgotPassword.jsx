// yh components tb render hoga jb user tap krega forget password ppr us time jo form appear hoga wo isi me dikhega

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Loader } from 'lucide-react';
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
      toast.success(res.data.message);
      navigate('/verify-reset');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to send code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <style>{`
        .forgot-container { min-height: 100vh; display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1rem; }
        .forgot-card { background: white; padding: 3rem; border-radius: 1.5rem; box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          width: 100%; max-width: 440px; animation: slideUp 0.5s ease-out; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .forgot-header { display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 2rem;
          font-size: 2rem; font-weight: 700; color: #1a202c; }
        .forgot-input { width: 100%; padding: 1rem; border: 2px solid #e2e8f0; border-radius: 0.75rem;
          font-size: 1rem; margin-bottom: 1.25rem; outline: none; }
        .forgot-input:focus { border-color: #667eea; box-shadow: 0 0 0 3px rgba(102,126,234,0.1); }
        .forgot-button { width: 100%; padding: 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white; border: none; border-radius: 0.75rem; font-size: 1rem; font-weight: 600;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer; }
        .forgot-button:disabled { opacity: 0.7; cursor: not-allowed; }
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .forgot-footer { margin-top: 2rem; text-align: center; color: #718096; }
        .forgot-link { color: #667eea; font-weight: 600; }
      `}</style>

      <div className="forgot-container">
        <form onSubmit={handleSubmit} className="forgot-card">
          <h2 className="forgot-header"><Mail size={32} /> Forgot Password</h2>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email" className="forgot-input" required />
          <button type="submit" className="forgot-button" disabled={loading}>
            {loading && <Loader size={20} className="spinner" />}
            {loading ? 'Sending...' : 'Send Reset Code'}
          </button>
          <p className="forgot-footer">
            Back to <Link to="/login" className="forgot-link">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;