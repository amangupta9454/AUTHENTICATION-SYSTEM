module.exports = {
  verificationOtp: (name, otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Email Verification</title>
<style>
  body {
    margin: 0;
    padding: 0;
    background-color: #0f172a;
    font-family: Arial, Helvetica, sans-serif;
    color: #111827;
  }
  .container {
    max-width: 620px;
    margin: 40px auto;
    background-color: #ffffff;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
  }
  .header {
    background: linear-gradient(135deg, #4f46e5, #6366f1);
    padding: 40px 25px;
    text-align: center;
    color: #ffffff;
  }
  .header h1 {
    margin: 0;
    font-size: 26px;
  }
  .header p {
    margin-top: 8px;
    font-size: 15px;
    opacity: 0.95;
  }
  .content {
    padding: 35px 30px;
    text-align: center;
  }
  .content h2 {
    font-size: 22px;
    margin-bottom: 10px;
    color: #111827;
  }
  .content p {
    font-size: 15px;
    line-height: 1.6;
    color: #374151;
  }
  .otp-box {
    margin: 30px auto;
    padding: 18px 28px;
    background-color: #eef2ff;
    border: 2px dashed #4f46e5;
    border-radius: 12px;
    font-size: 36px;
    font-weight: bold;
    letter-spacing: 10px;
    color: #1e1b4b;
    display: inline-block;
  }
  .info {
    background-color: #f0fdf4;
    border-left: 5px solid #22c55e;
    padding: 15px;
    margin-top: 25px;
    font-size: 14px;
    color: #065f46;
    border-radius: 8px;
    text-align: left;
  }
  .features {
    padding: 30px;
    background-color: #f9fafb;
    border-top: 1px solid #e5e7eb;
  }
  .features h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #111827;
  }
  .feature-list {
    list-style: none;
    padding: 0;
    max-width: 420px;
    margin: auto;
  }
  .feature-list li {
    padding: 10px 0;
    font-size: 15px;
    color: #374151;
  }
  .feature-list li::before {
    content: "✅ ";
  }
  .support {
    padding: 25px 30px;
    background-color: #eef2ff;
    text-align: center;
    border-top: 1px solid #e5e7eb;
  }
  .support p {
    margin: 6px 0;
    font-size: 14px;
    color: #1f2937;
  }
  .support a {
    color: #4338ca;
    font-weight: bold;
    text-decoration: none;
  }
  .footer {
    padding: 18px;
    background-color: #111827;
    text-align: center;
    font-size: 13px;
    color: #e5e7eb;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔐 Verify Your Email</h1>
      <p>Authentication App by Aman Gupta</p>
    </div>

    <div class="content">
      <h2>Hello ${name} 👋</h2>
      <p>Please use the verification code below to activate your account.</p>

      <div class="otp-box">${otp}</div>

      <p>This OTP is valid for <strong>10 minutes</strong>.</p>

      <div class="info">
        If you did not request this email, you can safely ignore it.
      </div>
    </div>

    <div class="features">
      <h3>What You Get After Verification</h3>
      <ul class="feature-list">
        <li>Secure JWT-based authentication</li>
        <li>Personalized user dashboard</li>
        <li>Profile & avatar upload</li>
        <li>Password recovery support</li>
      </ul>
    </div>

    <div class="support">
      <p>Need help?</p>
      <p>📧 <a href="mailto:amangupta231294@gmail.com">amangupta231294@gmail.com</a></p>
      <p>👨‍💻 Aman Gupta | 📞 +91-9560472926</p>
    </div>

    <div class="footer">
      © 2026 Auth By Aman Gupta. All rights reserved.
    </div>
  </div>
</body>
</html>
`,

  welcome: (name) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Welcome</title>
<style>
  body {
    background-color: #0f172a;
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 620px;
    margin: 40px auto;
    background: #ffffff;
    border-radius: 14px;
    overflow: hidden;
  }
  .header {
    background: linear-gradient(135deg, #16a34a, #22c55e);
    padding: 45px 25px;
    text-align: center;
    color: #ffffff;
  }
  .content {
    padding: 35px 30px;
    text-align: center;
    color: #111827;
  }
  .card {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    padding: 18px;
    margin: 12px 0;
    border-radius: 10px;
    font-size: 15px;
    color: #374151;
  }
  .footer {
    padding: 18px;
    background: #111827;
    text-align: center;
    font-size: 13px;
    color: #e5e7eb;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Welcome, ${name}!</h1>
    </div>

    <div class="content">
      <p>Your account is now active. You can safely start using all features.</p>

      <div class="card">🔐 Secure JWT Authentication</div>
      <div class="card">🧑‍🎨 Profile & Avatar Upload</div>
      <div class="card">♻ Easy Password Reset</div>
      <div class="card">⚡ Fast & Reliable Backend</div>
    </div>

    <div class="footer">
      © 2026 Auth By Aman Gupta
    </div>
  </div>
</body>
</html>
`,

  resetOtp: (name, otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Password Reset</title>
<style>
  body {
    background-color: #0f172a;
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
  }
  .container {
    max-width: 620px;
    margin: 40px auto;
    background: #ffffff;
    border-radius: 14px;
    overflow: hidden;
  }
  .header {
    background: linear-gradient(135deg, #dc2626, #ef4444);
    padding: 40px;
    text-align: center;
    color: #ffffff;
  }
  .content {
    padding: 35px 30px;
    text-align: center;
    color: #111827;
  }
  .otp {
    margin: 25px auto;
    padding: 18px 28px;
    font-size: 34px;
    font-weight: bold;
    letter-spacing: 10px;
    background: #fee2e2;
    color: #7f1d1d;
    border-radius: 12px;
    border: 2px dashed #dc2626;
    display: inline-block;
  }
  .warning {
    background: #fff7ed;
    border-left: 5px solid #f97316;
    padding: 15px;
    margin-top: 20px;
    font-size: 14px;
    color: #7c2d12;
    border-radius: 8px;
  }
  .footer {
    padding: 18px;
    background: #111827;
    text-align: center;
    font-size: 13px;
    color: #e5e7eb;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔑 Password Reset</h1>
    </div>

    <div class="content">
      <p>Hello ${name}, use the OTP below to reset your password.</p>

      <div class="otp">${otp}</div>

      <p>This OTP is valid for <strong>10 minutes</strong>.</p>

      <div class="warning">
        If you did not request this, please ignore this email.
      </div>
    </div>

    <div class="footer">
      © 2026 Auth By Aman Gupta
    </div>
  </div>
</body>
</html>
`
};
