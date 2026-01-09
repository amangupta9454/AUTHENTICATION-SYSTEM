const nodemailer = require("nodemailer");

console.log('Initializing Nodemailer transporter...');

// Create a transporter using Gmail SMTP.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  priority: "high",
  secure: true, // Use true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

console.log('Nodemailer transporter initialized successfully.');

module.exports = transporter;