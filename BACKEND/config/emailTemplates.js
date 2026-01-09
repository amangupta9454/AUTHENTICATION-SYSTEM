module.exports = {
  verificationOtp: (name, otp) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f6f9fc; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 50px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 10px 0 0; font-size: 16px; opacity: 0.9; }
        .content { padding: 40px 30px; text-align: center; color: #333; }
        .content h2 { font-size: 24px; margin-bottom: 20px; color: #4a5568; }
        .otp-box { font-size: 40px; font-weight: bold; letter-spacing: 12px; color: #667eea; background: #f0f4ff; padding: 25px; border-radius: 16px; display: inline-block; margin: 30px 0; border: 2px dashed #667eea; }
        .info { background: #ebf4ff; padding: 20px; border-radius: 12px; margin: 30px 0; }
        .features { background: #f8f9fa; padding: 30px; margin: 30px 0; border-radius: 12px; }
        .features h3 { text-align: center; margin-bottom: 20px; color: #4a5568; }
        .feature-list { list-style: none; padding: 0; }
        .feature-list li { padding: 10px 0; font-size: 16px; }
        .feature-list li::before { content: "✓ "; color: #667eea; font-weight: bold; }
        .support { background: #e6fffa; padding: 30px; border-radius: 12px; margin: 30px 0; text-align: center; }
        .support a { color: #667eea; text-decoration: none; font-weight: bold; }
        .footer { background: #1a202c; color: #a0aec0; padding: 30px; text-align: center; font-size: 14px; }
        .footer a { color: #667eea; text-decoration: none; }
        @media (max-width: 600px) {
          .otp-box { font-size: 32px; letter-spacing: 8px; padding: 20px; }
          .header { padding: 40px 20px; }
          .content { padding: 30px 20px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Your App</h1>
          <p>Email Verification Required</p>
        </div>
        <div class="content">
          <h2>Hello ${name}!</h2>
          <p>Thank you for signing up! Please verify your email address to activate your account.</p>
          <div class="otp-box">${otp}</div>
          <p>This code is valid for <strong>10 minutes</strong>. Copy and paste it in the app.</p>
          <div class="info">
            <p><strong>Tip:</strong> If you didn't request this, ignore this email. Your account remains secure.</p>
          </div>
        </div>
        <div class="features">
          <h3>What You Can Do After Verification</h3>
          <ul class="feature-list">
            <li>Upload and customize your image</li>
            <li>Access your personalized dashboard</li>
            <li>Secure login with JWT protection</li>
            <li>Easy password reset anytime</li>
          </ul>
        </div>
        <div class="support">
          <p>Need help? Contact our support team:</p>
          <p>Email: <a href="mailto:amangupta231294@gmail.com">E-Mail me</a><br>
          Developer: Aman Gupta<br>
          Phone: +91-9560472926</p>
        </div>
        <div class="footer">
          <p>&copy; 2026 Auth By Aman Gupta. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  welcome: (name) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Authentication App By Aman Gupta!</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f6f9fc; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 60px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 32px; }
        .header p { margin: 15px 0 0; font-size: 18px; opacity: 0.9; }
        .content { padding: 40px 30px; text-align: center; color: #333; }
        .content h2 { font-size: 28px; margin-bottom: 20px; color: #4a5568; }
        .welcome-note { font-size: 18px; line-height: 1.6; margin: 30px 0; }
        .features { background: #f0f4ff; padding: 40px 30px; margin: 30px 0; border-radius: 16px; }
        .features h3 { text-align: center; margin-bottom: 30px; color: #4a5568; font-size: 24px; }
        .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .feature-item { text-align: center; padding: 20px; background: white; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
        .feature-item strong { display: block; margin-bottom: 10px; color: #667eea; font-size: 18px; }
        .support { background: #e6fffa; padding: 30px; border-radius: 12px; margin: 30px 0; text-align: center; }
        .support a { color: #667eea; text-decoration: none; font-weight: bold; }
        .footer { background: #1a202c; color: #a0aec0; padding: 30px; text-align: center; font-size: 14px; }
        .footer a { color: #667eea; text-decoration: none; }
        @media (max-width: 600px) {
          .header { padding: 50px 20px; }
          .content { padding: 30px 20px; }
          .feature-grid { grid-template-columns: 1fr; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Authentication App By Aman Gupta 🎉</h1>
          <p>We're excited to have you on board</p>
        </div>
        <div class="content">
          <h2>Hello ${name}!</h2>
          <p class="welcome-note">Congratulations! Your email has been successfully verified, and your account is now fully active. Start exploring all the amazing features we've built just for you!</p>
        </div>
        <div class="features">
          <h3>Discover Our Key Features</h3>
          <div class="feature-grid">
            <div class="feature-item">
              <strong>Personal Dashboard</strong>
              View your profile, avatar, and account details in one beautiful place.
            </div>
            <div class="feature-item">
              <strong>Secure Authentication</strong>
              Protected with JWT tokens and bcrypt password hashing.
            </div>
            <div class="feature-item">
              <strong>Avatar Upload</strong>
              Personalize your profile with custom images powered by Cloudinary.
            </div>
            <div class="feature-item">
              <strong>Easy Recovery</strong>
              Forgot password? Reset it securely with OTP in minutes.
            </div>
          </div>
        </div>
        <div class="support">
          <p>Questions or need assistance? We're here to help!</p>
          <p>Email: <a href="mailto:amangupta231294@gmail.com">E-Mail me</a><br>
          Developer: Aman Gupta<br>
          Phone: +91-9560472926</p>
        </div>
        <div class="footer">
          <p>&copy; 2026 Auth By Aman Gupta. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  resetOtp: (name, otp) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset Request</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f6f9fc; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 50px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 10px 0 0; font-size: 16px; opacity: 0.9; }
        .content { padding: 40px 30px; text-align: center; color: #333; }
        .content h2 { font-size: 24px; margin-bottom: 20px; color: #4a5568; }
        .otp-box { font-size: 40px; font-weight: bold; letter-spacing: 12px; color: #667eea; background: #f0f4ff; padding: 25px; border-radius: 16px; display: inline-block; margin: 30px 0; border: 2px dashed #667eea; }
        .info { background: #fff3cd; padding: 20px; border-radius: 12px; margin: 30px 0; border-left: 5px solid #ffc107; }
        .tips { background: #f8f9fa; padding: 30px; margin: 30px 0; border-radius: 12px; }
        .tips h3 { text-align: center; margin-bottom: 20px; color: #4a5568; }
        .tip-list { list-style: none; padding: 0; text-align: left; max-width: 400px; margin: 0 auto; }
        .tip-list li { padding: 10px 0; font-size: 16px; }
        .tip-list li::before { content: "🔒 "; font-weight: bold; }
        .support { background: #e6fffa; padding: 30px; border-radius: 12px; margin: 30px 0; text-align: center; }
        .support a { color: #667eea; text-decoration: none; font-weight: bold; }
        .footer { background: #1a202c; color: #a0aec0; padding: 30px; text-align: center; font-size: 14px; }
        .footer a { color: #667eea; text-decoration: none; }
        @media (max-width: 600px) {
          .otp-box { font-size: 32px; letter-spacing: 8px; padding: 20px; }
          .header { padding: 40px 20px; }
          .content { padding: 30px 20px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset</h1>
          <p>Secure your account</p>
        </div>
        <div class="content">
          <h2>Hello ${name}!</h2>
          <p>We received a request to reset your password. Use the code below to proceed.</p>
          <div class="otp-box">${otp}</div>
          <p>This code expires in <strong>10 minutes</strong> for your security.</p>
          <div class="info">
            <p><strong>Important:</strong> If you didn't request this, ignore this email and consider changing your password immediately.</p>
          </div>
        </div>
        <div class="tips">
          <h3>Password Security Tips</h3>
          <ul class="tip-list">
            <li>Use a mix of letters, numbers, and symbols</li>
            <li>Avoid common words or personal information</li>
            <li>Don't reuse passwords across sites</li>
            <li>Enable two-factor authentication if available</li>
          </ul>
        </div>
        <div class="support">
          <p>Having issues? Reach out to us:</p>
          <p>Email: <a href="mailto:amangupta231294@gmail.com">E-Mail me</a><br>
          Developer: Aman Gupta<br>
          Phone: +91-9560472926</p>
        </div>
        <div class="footer">
          <p>&copy; 2026 Auth By Aman Gupta. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,
};