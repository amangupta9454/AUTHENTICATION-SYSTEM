// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Mail, Loader, CheckCircle } from 'lucide-react';
// import toast, { Toaster } from 'react-hot-toast';

// const Verify = () => {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [resending, setResending] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedEmail = localStorage.getItem('pendingEmail');
//     if (savedEmail) setEmail(savedEmail);
//   }, []);

//   const handleChange = (value, index) => {
//     if (!/^\d?$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (value && index < 5) {
//       document.getElementById(`otp-${index + 1}`)?.focus();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const code = otp.join('');

//     try {
//       const res = await axios.post(`${import.meta.env.VITE_API_URL}/verify-otp`, {
//         email,
//         otp: code,
//       });

//       localStorage.setItem('token', res.data.token);
//       localStorage.removeItem('pendingEmail');
//       toast.success('Verified successfully! Welcome 🎉');
//       setTimeout(() => navigate('/dashboard'), 1500);
//     } catch (err) {
//       toast.error(err.response?.data?.error || 'Invalid or expired OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     setResending(true);
//     try {
//       await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, { email });
//       toast.success('New OTP sent!');
//     } catch (err) {
//       toast.error('Failed to resend OTP');
//     } finally {
//       setResending(false);
//     }
//   };

//   return (
//     <>
//       <Toaster position="top-right" />
//       <style jsx>{`
//         .verify-container { min-height: 100vh; display: flex; align-items: center; justify-content: center;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1rem; }
//         .verify-card { background: white; padding: 3rem; border-radius: 1.5rem; box-shadow: 0 20px 60px rgba(0,0,0,0.3);
//           width: 100%; max-width: 500px; text-align: center; animation: slideUp 0.6s ease-out; }
//         .otp-inputs { display: flex; gap: 12px; justify-content: center; margin: 30px 0; }
//         .otp-input { width: 60px; height: 60px; font-size: 28px; font-weight: bold; text-align: center;
//           border: 2px solid #e2e8f0; border-radius: 12px; transition: all 0.3s; }
//         .otp-input:focus { border-color: #667eea; box-shadow: 0 0 0 4px rgba(102,126,234,0.2); outline: none; }
//         .verify-btn { width: 100%; padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white; border: none; border-radius: 12px; font-size: 18px; font-weight: 600; cursor: pointer; margin-top: 20px; }
//         .resend { color: #667eea; cursor: pointer; text-decoration: underline; margin-top: 20px; display: block; }
//         @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
//       `}</style>

//       <div className="verify-container">
//         <div className="verify-card">
//           <Mail size={60} color="#667eea" />
//           <h2 style={{ margin: '20px 0', fontSize: '28px' }}>Verify Your Email</h2>
//           <p style={{ color: '#718096', marginBottom: '30px' }}>
//             Enter the 6-digit code sent to<br />
//             <strong>{email || 'your email'}</strong>
//           </p>

//           <form onSubmit={handleSubmit}>
//             <div className="otp-inputs">
//               {otp.map((digit, i) => (
//                 <input
//                   key={i}
//                   id={`otp-${i}`}
//                   type="text"
//                   maxLength="1"
//                   value={digit}
//                   onChange={(e) => handleChange(e.target.value, i)}
//                   className="otp-input"
//                   required
//                 />
//               ))}
//             </div>

//             <button type="submit" className="verify-btn" disabled={loading}>
//               {loading ? <Loader size={24} className="spinner" style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }} /> : 'Verify'}
//             </button>
//           </form>

//           <div className="resend" onClick={handleResend}>
//             {resending ? 'Resending...' : "Didn't receive code? Resend OTP"}
//           </div>

//           <p style={{ marginTop: '30px', color: '#718096' }}>
//             <Link to="/login" style={{ color: '#667eea', textDecoration: 'none' }}>← Back to Login</Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Verify;

// yh to new user ko email verify krane ke liye use ho rha hai
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Loader } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Verify = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('pendingEmail');
    if (savedEmail) setEmail(savedEmail);
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
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/verify-otp`, { email, otp: code });
      localStorage.setItem('token', res.data.token);
      localStorage.removeItem('pendingEmail');
      toast.success('Verified successfully! Welcome 🎉');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/register`, { email });
      toast.success('New OTP sent!');
    } catch (err) {
      toast.error('Failed to resend');
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <style jsx>{`
        .verify-container { min-height: 100vh; display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1rem; }
        .verify-card { background: white; padding: 3rem; border-radius: 1.5rem; box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          width: 100%; max-width: 500px; text-align: center; animation: slideUp 0.6s ease-out; }
        .otp-inputs { display: flex; gap: 12px; justify-content: center; margin: 30px 0; }
        .otp-input { width: 60px; height: 60px; font-size: 28px; font-weight: bold; text-align: center;
          border: 2px solid #e2e8f0; border-radius: 12px; transition: all 0.3s; text-transform: none; }
        .otp-input:focus { border-color: #667eea; box-shadow: 0 0 0 4px rgba(102,126,234,0.2); outline: none; }
        .verify-btn { width: 100%; padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white; border: none; border-radius: 12px; font-size: 18px; font-weight: 600; cursor: pointer;
          margin-top: 20px; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .resend { color: #667eea; cursor: pointer; text-decoration: underline; margin-top: 20px; display: block; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 640px) { .verify-card { padding: 2rem; } .otp-input { width: 48px; height: 48px; font-size: 24px; } }
        @media (max-width: 400px) { .otp-inputs { gap: 8px; } .otp-input { width: 40px; height: 40px; font-size: 20px; } }
      `}</style>

      <div className="verify-container">
        <div className="verify-card">
          <Mail size={60} color="#667eea" />
          <h2 style={{ margin: '20px 0', fontSize: '28px' }}>Verify Your Email</h2>
          <p style={{ color: '#718096', marginBottom: '30px' }}>
            Enter the 6-character code sent to<br /><strong>{email || 'your email'}</strong>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="otp-inputs" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input key={i} id={`otp-${i}`} type="text" maxLength="1" value={digit}
                  onChange={(e) => handleChange(e.target.value, i)} className="otp-input" required />
              ))}
            </div>
            <button type="submit" className="verify-btn" disabled={loading}>
              {loading && <Loader size={24} style={{ animation: 'spin 1s linear infinite' }} />}
              Verify
            </button>
          </form>

          <div className="resend" onClick={handleResend}>
            {resending ? 'Resending...' : "Didn't receive code? Resend OTP"}
          </div>

          <p style={{ marginTop: '30px', color: '#718096' }}>
            <Link to="/login" style={{ color: '#667eea', textDecoration: 'none' }}>← Back to Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Verify;