// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const cloudinary = require('cloudinary').v2;
// const crypto = require('crypto');
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });
// console.log('cloudinary configured successfully');
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     let avatarUrl = '';
//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path);
//       avatarUrl = result.secure_url;
//     }
// //  yh exisiting user check kr rha hai
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: 'Email already registered' });
//     }
//     // Create user directly (no token, no email)
//     const user = new User({ name, email, password, avatar: avatarUrl});
//     await user.save();
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     res.status(201).json({ token,message: 'Registered and logged in successfully!' });
//     res.status(201).json({ 
//       message: 'User registered successfully! You can now login.' 
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
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


const jwt = require('jsonwebtoken');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const transporter = require('../config/nodemailer');
const emailTemplates = require('../config/emailTemplates');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log('cloudinary configured successfully');

exports.register = async (req, res) => {
  try {
    console.log('Starting user registration process...');
    const { name, email, password } = req.body;
    let avatarUrl = '';
    if (req.file) {
      console.log('Uploading avatar to Cloudinary...');
      const result = await cloudinary.uploader.upload(req.file.path);
      avatarUrl = result.secure_url;
      console.log('Avatar uploaded successfully:', avatarUrl);
    }
    // Check for existing user
    console.log('Checking for existing user with email:', email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email already registered:', email);
      return res.status(400).json({ error: 'Email already registered' });
    }
    // Create user
    console.log('Creating new user...');
    const user = new User({ name, email, password, avatar: avatarUrl });
    await user.save();
    console.log('User saved successfully:', user._id);

    // Send welcome email
    console.log('Preparing to send welcome email to:', email);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Our App!',
      html: emailTemplates.welcome(name),
    };
    try {
      console.log('Sending welcome email...');
      const info = await transporter.sendMail(mailOptions);
      console.log('Welcome email sent successfully:', info.messageId);
    } catch (emailErr) {
      console.error('Error sending welcome email:', emailErr.message);
      // Note: We don't fail the registration if email fails, but log it
    }

    // Generate token and respond
    console.log('Generating JWT token...');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('Registration complete. Sending response with token.');
    res.status(201).json({ token, message: 'Registered and logged in successfully!' });
  } catch (err) {
    console.error('Error during registration:', err.message);
    res.status(500).json({ error: err.message });
  }
};

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
    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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