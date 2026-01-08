import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, Eye, EyeOff, Loader } from 'lucide-react';
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
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
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
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Registration successful! Redirecting...');

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setTimeout(() => navigate('/login'), 1000);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Registration failed';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <style>{`
        .register-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 1rem;
        }

        .register-card {
          background: white;
          padding: 3rem;
          border-radius: 1.5rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          width: 100%;
          max-width: 480px;
          animation: slideUp 0.5s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .register-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
          font-size: 2rem;
          font-weight: 700;
          color: #1a202c;
        }

        .avatar-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .avatar-preview {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
          border: 4px solid #f0f4ff;
        }

        .avatar-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-placeholder {
          font-size: 3rem;
          color: white;
        }

        .avatar-input-label {
          position: relative;
          display: inline-block;
          cursor: pointer;
        }

        .avatar-input {
          display: none;
        }

        .avatar-input-label span {
          padding: 0.75rem 1.5rem;
          background: #f0f4ff;
          color: #667eea;
          border-radius: 0.75rem;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .avatar-input-label:hover span {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        .register-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 0.75rem;
          font-size: 1rem;
          margin-bottom: 1.25rem;
          transition: all 0.3s ease;
          outline: none;
        }

        .register-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .register-input::placeholder {
          color: #a0aec0;
        }

        .password-wrapper {
          position: relative;
          margin-bottom: 1.25rem;
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #667eea;
          transition: color 0.3s ease;
        }

        .password-toggle:hover {
          color: #764ba2;
        }

        .register-button {
          width: 100%;
          padding: 1rem;
          border: none;
          border-radius: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .register-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .register-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .register-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          display: inline-block;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .register-footer {
          margin-top: 2rem;
          text-align: center;
          color: #718096;
          font-size: 0.95rem;
        }

        .register-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .register-link:hover {
          color: #764ba2;
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .register-card {
            padding: 2rem 1.5rem;
          }

          .register-header {
            font-size: 1.75rem;
          }

          .avatar-preview {
            width: 100px;
            height: 100px;
          }

          .register-input {
            padding: 0.875rem;
          }

          .register-button {
            padding: 0.875rem;
          }
        }

        @media (max-width: 400px) {
          .register-card {
            padding: 1.5rem 1rem;
          }

          .register-header {
            font-size: 1.5rem;
          }

          .avatar-preview {
            width: 80px;
            height: 80px;
          }

          .avatar-input-label span {
            padding: 0.625rem 1rem;
            font-size: 0.875rem;
          }
        }
      `}</style>

      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-card">
          <h2 className="register-header">
            <UserPlus size={32} /> Register
          </h2>

          <div className="avatar-section">
            <div className="avatar-preview">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar preview" />
              ) : (
                <span className="avatar-placeholder">👤</span>
              )}
            </div>
            <label className="avatar-input-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="avatar-input"
              />
              <span>Choose Avatar</span>
            </label>
          </div>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="register-input"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="register-input"
            required
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="register-input"
              style={{ paddingRight: '3rem' }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading && <Loader size={20} className="spinner" />}
            {loading ? 'Creating Account...' : 'Register'}
          </button>

          <p className="register-footer">
            Already have an account?{' '}
            <Link to="/login" className="register-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
