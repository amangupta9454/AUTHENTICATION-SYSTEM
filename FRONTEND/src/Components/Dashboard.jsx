import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LayoutDashboard, LogOut, Mail, User } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || new URLSearchParams(window.location.search).get('token');
    if (token) localStorage.setItem('token', token);

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        toast.error('Session expired. Redirecting to login...');
        setTimeout(() => navigate('/login'), 1500);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    setTimeout(() => navigate('/login'), 1000);
  };

  if (loading) {
    return (
      <>
        <style>{`
          .loading-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }

          .spinner-box {
            display: inline-block;
          }

          .spinner {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top: 4px solid white;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .loading-text {
            color: white;
            margin-top: 1rem;
            font-size: 1.1rem;
            font-weight: 500;
          }
        `}</style>
        <div className="loading-container">
          <div style={{ textAlign: 'center' }}>
            <div className="spinner-box">
              <div className="spinner"></div>
            </div>
            <div className="loading-text">Loading your profile...</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <style>{`
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
        }

        .dashboard-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white;
          margin-bottom: 3rem;
          font-size: 1.75rem;
          font-weight: 700;
        }

        .dashboard-content {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          padding: 1rem;
        }

        .dashboard-card {
          background: white;
          border-radius: 1.5rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          padding: 3rem;
          width: 100%;
          max-width: 500px;
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

        .avatar-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
        }

        .avatar-image {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          object-fit: cover;
          border: 5px solid #f0f4ff;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .avatar-placeholder {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          border: 5px solid #f0f4ff;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
          animation: float 3s ease-in-out infinite;
        }

        .user-name {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a202c;
          margin-top: 1rem;
          text-align: center;
        }

        .user-badge {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.85rem;
          font-weight: 600;
          margin-top: 0.5rem;
          text-align: center;
        }

        .user-info-section {
          margin-bottom: 2rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f0f4ff;
          border-radius: 0.75rem;
          margin-bottom: 1rem;
          border-left: 4px solid #667eea;
          transition: all 0.3s ease;
        }

        .info-item:hover {
          background: #e6edff;
          transform: translateX(5px);
        }

        .info-label {
          color: #718096;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .info-value {
          color: #1a202c;
          font-size: 1rem;
          font-weight: 500;
          word-break: break-all;
        }

        .info-icon {
          color: #667eea;
          flex-shrink: 0;
        }

        .button-group {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .logout-button {
          flex: 1;
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
          gap: 0.75rem;
          background: #ef4444;
          color: white;
        }

        .logout-button:hover {
          background: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(239, 68, 68, 0.4);
        }

        .logout-button:active {
          transform: translateY(0);
        }

        .edit-button {
          flex: 1;
          padding: 1rem;
          border: 2px solid #667eea;
          border-radius: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: white;
          color: #667eea;
        }

        .edit-button:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .edit-button:active {
          transform: translateY(0);
        }

        @media (max-width: 640px) {
          .dashboard-header {
            font-size: 1.5rem;
            margin-bottom: 2rem;
          }

          .dashboard-card {
            padding: 2rem 1.5rem;
          }

          .avatar-image,
          .avatar-placeholder {
            width: 120px;
            height: 120px;
            font-size: 3rem;
          }

          .user-name {
            font-size: 1.5rem;
          }

          .button-group {
            flex-direction: column;
          }

          .logout-button,
          .edit-button {
            width: 100%;
          }
        }

        @media (max-width: 400px) {
          .dashboard-card {
            padding: 1.5rem 1rem;
          }

          .dashboard-header {
            font-size: 1.25rem;
          }

          .avatar-image,
          .avatar-placeholder {
            width: 100px;
            height: 100px;
            font-size: 2.5rem;
          }

          .user-name {
            font-size: 1.25rem;
          }

          .info-item {
            padding: 0.75rem;
            flex-direction: column;
            align-items: flex-start;
          }

          .info-label {
            font-size: 0.75rem;
          }

          .info-value {
            font-size: 0.95rem;
          }
        }
      `}</style>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <LayoutDashboard size={32} /> Dashboard
        </div>

        <div className="dashboard-content">
          <div className="dashboard-card">
            <div className="avatar-container">
              {user.avatar ? (
                <img src={user.avatar} alt="User Avatar" className="avatar-image" />
              ) : (
                <div className="avatar-placeholder">👤</div>
              )}
              <div className="user-name">{user.name}</div>
              <div className="user-badge">Member</div>
            </div>

            <div className="user-info-section">
              <div className="info-item">
                <Mail size={20} className="info-icon" />
                <div>
                  <div className="info-label">Email Address</div>
                  <div className="info-value">{user.email}</div>
                </div>
              </div>

              <div className="info-item">
                <User size={20} className="info-icon" />
                <div>
                  <div className="info-label">Account Status</div>
                  <div className="info-value">Active</div>
                </div>
              </div>
            </div>

            <div className="button-group">
              <button className="edit-button">Edit Profile</button>
              <button onClick={handleLogout} className="logout-button">
                <LogOut size={20} /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
