// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const cloudinary = require('cloudinary').v2;
// const streamifier = require('streamifier');
// const transporter = require('../config/nodemailer');
// const emailTemplates = require('../config/emailTemplates');
// const bcrypt = require('bcryptjs');

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// console.log('Cloudinary configured');

// const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// // REGISTER - Sends OTP
// exports.register = async (req, res) => {
//   try {
//     console.log('Registration attempt...');
//     const { name, email, password } = req.body;
//     let avatarUrl = '';

//     if (req.file) {
//       console.log('Uploading avatar to Cloudinary...');
//       const result = await new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { folder: 'avatars' },
//           (error, result) => (error ? reject(error) : resolve(result))
//         );
//         streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
//       });
//       avatarUrl = result.secure_url;
//       console.log('Avatar uploaded');
//     }

//     let user = await User.findOne({ email });

//     const otp = generateOtp();
//     const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

//     if (user) {
//       if (user.isVerified) {
//         return res.status(400).json({ error: 'Email already registered and verified' });
//       }
//       // Update unverified user
//       user.name = name || user.name;
//       if (password) user.password = await bcrypt.hash(password, 10);
//       user.avatar = avatarUrl || user.avatar;
//       user.verificationOtp = otp;
//       user.verificationOtpExpires = otpExpires;
//     } else {
//       user = new User({
//         name,
//         email,
//         password: password ? await bcrypt.hash(password, 10) : undefined,
//         avatar: avatarUrl,
//         verificationOtp: otp,
//         verificationOtpExpires: otpExpires,
//       });
//     }

//     await user.save();
//     console.log('User saved/updated with OTP');

//     try {
//       await transporter.sendMail({
//         from: `"Your App" <${process.env.EMAIL_USER}>`,
//         to: email,
//         subject: 'Your Verification Code',
//         html: emailTemplates.verificationOtp(name || 'User', otp),
//       });
//       console.log('OTP email sent');
//     } catch (emailErr) {
//       console.error('Failed to send OTP:', emailErr.message);
//       return res.status(500).json({ error: 'Failed to send verification code' });
//     }

//     res.status(201).json({
//       message: 'Verification code sent to your email',
//       email, // send back for frontend
//     });
//   } catch (err) {
//     console.error('Register error:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// // VERIFY OTP
// exports.verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     if (!email || !otp) return res.status(400).json({ error: 'Email and OTP required' });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ error: 'Invalid email' });
//     if (user.isVerified) return res.status(400).json({ error: 'Already verified' });

//     if (user.verificationOtp !== otp) {
//       return res.status(400).json({ error: 'Invalid OTP' });
//     }
//     if (user.verificationOtpExpires < Date.now()) {
//       return res.status(400).json({ error: 'OTP expired' });
//     }

//     user.isVerified = true;
//     user.verificationOtp = undefined;
//     user.verificationOtpExpires = undefined;
//     await user.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

//     // Send welcome email
//     try {
//       await transporter.sendMail({
//         from: `"Your App" <${process.env.EMAIL_USER}>`,
//         to: email,
//         subject: 'Welcome!',
//         html: emailTemplates.welcome(user.name),
//       });
//     } catch (e) {}

//     res.json({ token, message: 'Email verified! Welcome!' });
//   } catch (err) {
//     console.error('Verify OTP error:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }
//     if (!user.password) {
//       return res.status(401).json({ error: 'Please login with Google' });
//     }
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }
//     // Generate JWT
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     res.json({ token, message: 'Login successful' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };
// controllers/authController.js (updated with forgot, verify reset, reset password + comments in Hinglish)
// Ye line jwt ko import kar rahi hai token generate karne ke liye
const jwt = require('jsonwebtoken');
// Ye line User model ko import kar rahi hai database se user handle karne ke liye
const User = require('../models/User');
// Ye line cloudinary ko import kar rahi hai image upload ke liye
const cloudinary = require('cloudinary').v2;
// Ye line streamifier ko import kar rahi hai buffer se stream banane ke liye
const streamifier = require('streamifier');
// Ye line transporter ko import kar rahi hai email send karne ke liye
const transporter = require('../config/nodemailer');
// Ye line emailTemplates ko import kar rahi hai email content ke liye
const emailTemplates = require('../config/emailTemplates');
// Ye line bcrypt ko import kar rahi hai password hash karne ke liye
const bcrypt = require('bcryptjs');

// Ye line cloudinary ko configure kar rahi hai env variables se
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Ye line console log kar rahi hai ki cloudinary setup ho gaya
console.log('Cloudinary configured');

// Ye function alpha-numeric OTP generate kar raha hai 6 characters ka
const generateOtp = () => {
  // Ye line characters ki string bana rahi hai alpha-numeric ke liye
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  // Ye variable otp ko empty string set kar raha hai
  let otp = '';
  // Ye loop 6 baar chal raha hai random char add karne ke liye
  for (let i = 0; i < 6; i++) {
    // Ye line random index generate kar rahi hai
    const randomIndex = Math.floor(Math.random() * chars.length);
    // Ye line otp me char add kar rahi hai
    otp += chars[randomIndex];
  }
  // Ye line generated otp return kar rahi hai
  return otp;
};

// REGISTER - Sends OTP
// Ye exports.register function hai jo register handle kar raha hai
exports.register = async (req, res) => {
  // Ye try block hai error handle ke liye
  try {
    // Ye log kar raha hai registration start
    console.log('Registration attempt...');
    // Ye line body se name, email, password nikaal rahi hai
    const { name, email, password } = req.body;
    // Ye variable avatarUrl ko empty set kar raha hai
    let avatarUrl = '';

    // Ye check kar raha hai agar file upload hua hai to
    if (req.file) {
      // Ye log kar raha hai upload start
      console.log('Uploading avatar to Cloudinary...');
      // Ye promise bana raha hai upload ke liye
      const result = await new Promise((resolve, reject) => {
        // Ye upload stream create kar raha hai
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'avatars' },
          (error, result) => (error ? reject(error) : resolve(result))
        );
        // Ye buffer se stream pipe kar raha hai
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
      // Ye avatarUrl set kar raha hai secure url se
      avatarUrl = result.secure_url;
      // Ye log kar raha hai upload complete
      console.log('Avatar uploaded');
    }

    // Ye user find kar raha hai email se
    let user = await User.findOne({ email });

    // Ye otp generate kar raha hai
    const otp = generateOtp();
    // Ye otp expiry set kar raha hai 10 min baad
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Ye check kar raha hai agar user already exist hai
    if (user) {
      // Ye check kar raha hai agar verified hai to error
      if (user.isVerified) {
        return res.status(400).json({ error: 'Email already registered and verified' });
      }
      // Update unverified user
      // Ye name update kar raha hai agar naya hai
      user.name = name || user.name;
      // Ye password hash kar raha hai agar password hai
      if (password) user.password = await bcrypt.hash(password, 10);
      // Ye avatar update kar raha hai
      user.avatar = avatarUrl || user.avatar;
      // Ye verificationOtp update kar raha hai
      user.verificationOtp = otp;
      // Ye expiry update kar raha hai
      user.verificationOtpExpires = otpExpires;
    } else {
      // Ye naya user create kar raha hai
      user = new User({
        name,
        email,
        password: password ? await bcrypt.hash(password, 10) : undefined,
        avatar: avatarUrl,
        verificationOtp: otp,
        verificationOtpExpires: otpExpires,
      });
    }

    // Ye user ko save kar raha hai database me
    await user.save();
    // Ye log kar raha hai save complete
    console.log('User saved/updated with OTP');

    // Ye try block hai email send ke liye
    try {
      // Ye email send kar raha hai transporter se
      await transporter.sendMail({
        from: `"Authentication App By Aman Gupta" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your Verification Code',
        html: emailTemplates.verificationOtp(name || 'User', otp),
      });
      // Ye log kar raha hai email sent
      console.log('OTP email sent');
    } catch (emailErr) {
      // Ye error log kar raha hai email fail
      console.error('Failed to send OTP:', emailErr.message);
      // Ye response bhej raha hai error
      return res.status(500).json({ error: 'Failed to send verification code' });
    }

    // Ye success response bhej raha hai
    res.status(201).json({
      message: 'Verification code sent to your email',
      email, // send back for frontend
    });
  } catch (err) {
    // Ye error log kar raha hai
    console.error('Register error:', err);
    // Ye server error response bhej raha hai
    res.status(500).json({ error: 'Server error' });
  }
};

// VERIFY OTP
// Ye exports.verifyOtp function hai verification ke liye
exports.verifyOtp = async (req, res) => {
  // Ye try block hai
  try {
    // Ye body se email aur otp nikaal raha hai
    const { email, otp } = req.body;
    // Ye check kar raha hai required fields
    if (!email || !otp) return res.status(400).json({ error: 'Email and OTP required' });

    // Ye user find kar raha hai email se
    const user = await User.findOne({ email });
    // Ye check kar raha hai user exist nahi to error
    if (!user) return res.status(400).json({ error: 'Invalid email' });
    // Ye check kar raha hai already verified to error
    if (user.isVerified) return res.status(400).json({ error: 'Already verified' });

    // Ye check kar raha hai otp match nahi to error
    if (user.verificationOtp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
    // Ye check kar raha hai expiry over to error
    if (user.verificationOtpExpires < Date.now()) {
      return res.status(400).json({ error: 'OTP expired' });
    }

    // Ye isVerified true set kar raha hai
    user.isVerified = true;
    // Ye otp clear kar raha hai
    user.verificationOtp = undefined;
    // Ye expiry clear kar raha hai
    user.verificationOtpExpires = undefined;
    // Ye user save kar raha hai
    await user.save();

    // Ye jwt token generate kar raha hai 7 days ke liye
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Send welcome email
    // Ye try block hai welcome email ke liye
    try {
      // Ye welcome email send kar raha hai
      await transporter.sendMail({
        from: `"Authentication App By Aman Gupta" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome!',
        html: emailTemplates.welcome(user.name),
      });
    } catch (e) {} // Ye ignore kar raha hai agar fail ho

    // Ye response bhej raha hai token ke saath
    res.json({ token, message: 'Email verified! Welcome!' });
  } catch (err) {
    // Ye error log kar raha hai
    console.error('Verify OTP error:', err);
    // Ye server error bhej raha hai
    res.status(500).json({ error: 'Server error' });
  }
};

// LOGIN
// Ye exports.login function hai login ke liye
exports.login = async (req, res) => {
  // Ye try block hai
  try {
    // Ye body se email password nikaal raha hai
    const { email, password } = req.body;
    // Ye user find kar raha hai
    const user = await User.findOne({ email });
    // Ye check exist nahi to error
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Ye check password nahi to google login bol raha hai
    if (!user.password) {
      return res.status(401).json({ error: 'Please login with Google' });
    }
    // Ye password compare kar raha hai
    const isMatch = await user.comparePassword(password);
    // Ye match nahi to error
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Ye token generate kar raha hai
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    // Ye response bhej raha hai
    res.json({ token, message: 'Login successful' });
  } catch (err) {
    // Ye error response bhej raha hai
    res.status(500).json({ error: err.message });
  }
};

// GET USER
// Ye exports.getUser function hai user details ke liye
exports.getUser = async (req, res) => {
  // Ye try block hai
  try {
    // Ye user find kar raha hai id se without password
    const user = await User.findById(req.user.id).select('-password');
    // Ye not found to error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Ye user bhej raha hai
    res.json(user);
  } catch (err) {
    // Ye server error
    res.status(500).json({ error: 'Server error' });
  }
};

// FORGOT PASSWORD - Send Reset OTP
// Ye exports.forgotPassword function hai forget password ke liye
exports.forgotPassword = async (req, res) => {
  // Ye try block hai
  try {
    // Ye body se email nikaal raha hai
    const { email } = req.body;
    // Ye user find kar raha hai
    const user = await User.findOne({ email });
    // Ye not found or not verified to error
    if (!user || !user.isVerified) {
      return res.status(400).json({ error: 'Email not registered or verified' });
    }

    // Ye otp generate kar raha hai
    const otp = generateOtp();
    // Ye expiry set kar raha hai
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Ye resetOtp set kar raha hai
    user.resetOtp = otp;
    // Ye expiry set kar raha hai
    user.resetOtpExpires = otpExpires;
    // Ye save kar raha hai
    await user.save();

    // Ye try block email send ke liye
    try {
      // Ye reset email send kar raha hai
      await transporter.sendMail({
        from: `"Authentication App By Aman Gupta" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Password Reset Code',
        html: emailTemplates.resetOtp(user.name, otp),
      });
      // Ye log kar raha hai
      console.log('Reset OTP email sent');
    } catch (emailErr) {
      // Ye error log
      console.error('Failed to send reset OTP:', emailErr.message);
      // Ye error response
      return res.status(500).json({ error: 'Failed to send reset code' });
    }

    // Ye success response with email
    res.json({ message: 'Reset code sent to your email', email });
  } catch (err) {
    // Ye error log
    console.error('Forgot password error:', err);
    // Ye server error
    res.status(500).json({ error: 'Server error' });
  }
};

// VERIFY RESET OTP
// Ye exports.verifyResetOtp function hai reset otp verify ke liye
exports.verifyResetOtp = async (req, res) => {
  // Ye try block
  try {
    // Ye body se email otp
    const { email, otp } = req.body;
    // Ye required check
    if (!email || !otp) return res.status(400).json({ error: 'Email and OTP required' });

    // Ye user find
    const user = await User.findOne({ email });
    // Ye not found error
    if (!user) return res.status(400).json({ error: 'Invalid email' });

    // Ye otp match check
    if (user.resetOtp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
    // Ye expiry check
    if (user.resetOtpExpires < Date.now()) {
      return res.status(400).json({ error: 'OTP expired' });
    }

    // Ye otp clear
    user.resetOtp = undefined;
    // Ye expiry clear
    user.resetOtpExpires = undefined;
    // Ye save
    await user.save();

    // Ye short expiry token generate kar raha hai reset ke liye 10 min
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });

    // Ye response with token
    res.json({ token, message: 'OTP verified. Proceed to reset password.' });
  } catch (err) {
    // Ye error log
    console.error('Verify reset OTP error:', err);
    // Ye server error
    res.status(500).json({ error: 'Server error' });
  }
};

// RESET PASSWORD
// Ye exports.resetPassword function hai password reset ke liye
exports.resetPassword = async (req, res) => {
  // Ye try block
  try {
    // Ye body se newPassword
    const { newPassword } = req.body;
    // Ye required check
    if (!newPassword) return res.status(400).json({ error: 'New password required' });

    // Ye user find from token (req.user from middleware)
    const user = await User.findById(req.user.id);
    // Ye not found error
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Ye new password hash
    user.password = await bcrypt.hash(newPassword, 10);
    // Ye save
    await user.save();

    // Ye success response
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    // Ye error log
    console.error('Reset password error:', err);
    // Ye server error
    res.status(500).json({ error: 'Server error' });
  }
};