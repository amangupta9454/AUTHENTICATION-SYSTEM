const nodemailer = require('nodemailer');

console.log('Initializing Nodemailer for Gmail (Vercel)...');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // 16-digit App Password
  },
  tls: { rejectUnauthorized: false },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Nodemailer setup failed:', error.message);
  } else {
    console.log('Nodemailer ready to send emails');
  }
});

module.exports = transporter;