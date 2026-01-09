import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response.data.error);
    }
  };


  return (
    <>
      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 1rem;
        }

        .login-card {
          background: white;
          padding: 3rem;
          border-radius: 1.5rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          width: 100%;
          max-width: 440px;
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

        .login-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
          font-size: 2rem;
          font-weight: 700;
          color: #1a202c;
        }

        .login-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 0.75rem;
          font-size: 1rem;
          margin-bottom: 1.25rem;
          transition: all 0.3s ease;
          outline: none;
        }

        .login-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .login-input::placeholder {
          color: #a0aec0;
        }

        .login-button {
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
        }

        .login-button-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          margin-bottom: 1rem;
        }

        .login-button-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .login-button-primary:active {
          transform: translateY(0);
        }

        .login-button-google {
          background: white;
          color: #1a202c;
          border: 2px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .login-button-google:hover {
          background: #f7fafc;
          border-color: #cbd5e0;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .login-button-google:active {
          transform: translateY(0);
        }

        .login-button-google::before {
          content: 'G';
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #EA4335 0%, #FBBC05 25%, #34A853 50%, #4285F4 100%);
          border-radius: 50%;
          font-weight: 700;
          color: white;
          font-size: 14px;
        }

        .login-footer {
          margin-top: 2rem;
          text-align: center;
          color: #718096;
          font-size: 0.95rem;
        }

        .login-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .login-link:hover {
          color: #764ba2;
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .login-card {
            padding: 2rem 1.5rem;
          }

          .login-header {
            font-size: 1.75rem;
          }

          .login-input {
            padding: 0.875rem;
          }

          .login-button {
            padding: 0.875rem;
          }
        }

        @media (max-width: 400px) {
          .login-card {
            padding: 1.5rem 1rem;
          }

          .login-header {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-card">
          <h2 className="login-header">
            <LogIn size={32} /> Login
          </h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="login-input"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login-input"
            required
          />
          <button type="submit" className="login-button login-button-primary">
            Login
          </button>
          
          <p className="login-footer">
            No account? <Link to="/register" className="login-link">Register</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
