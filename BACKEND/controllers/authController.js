const jwt = require('jsonwebtoken');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const transporter = require('../config/nodemailer');
const emailTemplates = require('../config/emailTemplates');
const bcrypt = require('bcryptjs');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log('Cloudinary configured');
const generateOtp = () => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let otp = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    otp += chars[randomIndex];
  }
  return otp;
};

// REGISTER - Sends OTP
exports.register = async (req, res) => {
  try {
    console.log('Registration attempt...');
    const { name, email, password } = req.body;
    let avatarUrl = '';
    if (req.file) {
      console.log('Uploading avatar to Cloudinary...');
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'avatars' },
          (error, result) => (error ? reject(error) : resolve(result))
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
      avatarUrl = result.secure_url;
      console.log('Avatar uploaded');
    }
    let user = await User.findOne({ email });
    const otp = generateOtp();
    const otpExpires = Date.now() + 10 * 60 * 1000; 
    if (user) {
      if (user.isVerified) {
        return res.status(400).json({ error: 'Email already registered and verified' });
      }
      user.name = name || user.name;
      if (password) user.password = await bcrypt.hash(password, 10);
      user.avatar = avatarUrl || user.avatar;
      user.verificationOtp = otp;
      user.verificationOtpExpires = otpExpires;
    } else {
      user = new User({
        name,
        email,
        password: password ? await bcrypt.hash(password, 10) : undefined,
        avatar: avatarUrl,
        verificationOtp: otp,
        verificationOtpExpires: otpExpires,
      });
    }
    await user.save();
    console.log('User saved/updated with OTP');
    try {
      await transporter.sendMail({
        from: `"Authentication App By Aman Gupta" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your Verification Code',
        html: emailTemplates.verificationOtp(name || 'User', otp),
      });
      console.log('OTP email sent');
    } catch (emailErr) {
      console.error('Failed to send OTP:', emailErr.message);
      return res.status(500).json({ error: 'Failed to send verification code' });
    }
    res.status(201).json({
      message: 'Verification code sent to your email',
      email, 
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// VERIFY OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: 'Email and OTP required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email' });
    if (user.isVerified) return res.status(400).json({ error: 'Already verified' });
    if (user.verificationOtp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
    if (user.verificationOtpExpires < Date.now()) {
      return res.status(400).json({ error: 'OTP expired' });
    }
    user.isVerified = true;
    user.verificationOtp = undefined;
    user.verificationOtpExpires = undefined;
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    try {
      await transporter.sendMail({
        from: `"Authentication App By Aman Gupta" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome!',
        html: emailTemplates.welcome(user.name),
      });
    } catch (e) {}
    res.json({ token, message: 'Email verified! Welcome!' });
  } catch (err) {
    console.error('Verify OTP error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    if (!user.password) {
      return res.status(401).json({ error: 'Please login with Google' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET USER
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// FORGOT PASSWORD - Send Reset OTP
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) {
      return res.status(400).json({ error: 'Email not registered or verified' });
    }
    const otp = generateOtp();
    const otpExpires = Date.now() + 10 * 60 * 1000; 
    user.resetOtp = otp;
    user.resetOtpExpires = otpExpires;
    await user.save();
    try {
      await transporter.sendMail({
        from: `"Authentication App By Aman Gupta" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Password Reset Code',
        html: emailTemplates.resetOtp(user.name, otp),
      });
      console.log('Reset OTP email sent');
    } catch (emailErr) {
      console.error('Failed to send reset OTP:', emailErr.message);
      return res.status(500).json({ error: 'Failed to send reset code' });
    }
    res.json({ message: 'Reset code sent to your email', email });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// VERIFY RESET OTP
exports.verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: 'Email and OTP required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email' });
    if (user.resetOtp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
    if (user.resetOtpExpires < Date.now()) {
      return res.status(400).json({ error: 'OTP expired' });
    }
    user.resetOtp = undefined;
    user.resetOtpExpires = undefined;
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });
    res.json({ token, message: 'OTP verified. Proceed to reset password.' });
  } catch (err) {
    console.error('Verify reset OTP error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword) return res.status(400).json({ error: 'New password required' });
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};