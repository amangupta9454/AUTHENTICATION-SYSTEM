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
    background: radial-gradient(circle at top, #1e293b, #020617);
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    color: #e5e7eb;
  }
  .container {
    max-width: 640px;
    margin: 40px auto;
    background: linear-gradient(180deg, #020617, #020617);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 25px 60px rgba(0,0,0,0.7);
    border: 1px solid #1e293b;
  }
  .header {
    background: linear-gradient(135deg, #7c3aed, #2563eb);
    padding: 60px 30px;
    text-align: center;
  }
  .header h1 {
    margin: 0;
    font-size: 30px;
    font-weight: 700;
  }
  .header p {
    margin-top: 10px;
    opacity: 0.9;
    font-size: 16px;
  }
  .content {
    padding: 45px 30px;
    text-align: center;
  }
  .content h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  .content p {
    font-size: 16px;
    color: #cbd5f5;
    line-height: 1.6;
  }
  .otp-box {
    margin: 35px auto;
    padding: 25px 40px;
    background: linear-gradient(135deg, #020617, #020617);
    border: 2px dashed #7c3aed;
    border-radius: 16px;
    font-size: 42px;
    font-weight: 800;
    letter-spacing: 14px;
    color: #a78bfa;
    display: inline-block;
  }
  .note {
    background: #020617;
    border-left: 5px solid #22c55e;
    padding: 18px 20px;
    border-radius: 12px;
    margin-top: 30px;
    font-size: 14px;
    color: #d1fae5;
  }
  .features {
    padding: 40px 30px;
    background: linear-gradient(180deg, #020617, #020617);
    border-top: 1px solid #1e293b;
  }
  .features h3 {
    text-align: center;
    margin-bottom: 25px;
    font-size: 20px;
    color: #c7d2fe;
  }
  .feature-list {
    list-style: none;
    padding: 0;
    max-width: 420px;
    margin: auto;
  }
  .feature-list li {
    padding: 12px 0;
    font-size: 15px;
  }
  .feature-list li::before {
    content: "🚀 ";
  }
  .support {
    padding: 35px 30px;
    background: linear-gradient(135deg, #020617, #020617);
    text-align: center;
    border-top: 1px solid #1e293b;
  }
  .support a {
    color: #60a5fa;
    text-decoration: none;
    font-weight: 600;
  }
  .footer {
    padding: 25px;
    text-align: center;
    font-size: 13px;
    color: #94a3b8;
    background: #020617;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔐 Verify Your Email</h1>
      <p>Authentication App • Secure Access</p>
    </div>

    <div class="content">
      <h2>Hello ${name} 👋</h2>
      <p>Welcome aboard! Please confirm your email address using the verification code below.</p>

      <div class="otp-box">${otp}</div>

      <p>This OTP is valid for <strong>10 minutes</strong>.</p>

      <div class="note">
        ✅ If you didn’t request this email, you can safely ignore it.
      </div>
    </div>

    <div class="features">
      <h3>✨ What You Unlock After Verification</h3>
      <ul class="feature-list">
        <li>Personalized user dashboard</li>
        <li>Secure JWT-based authentication</li>
        <li>Profile & avatar customization</li>
        <li>Password recovery & account security</li>
      </ul>
    </div>

    <div class="support">
      <p>Need help? We’ve got you covered 💬</p>
      <p>
        📧 <a href="mailto:amangupta231294@gmail.com">amangupta231294@gmail.com</a><br/>
        👨‍💻 Aman Gupta<br/>
        📞 +91-9560472926
      </p>
    </div>

    <div class="footer">
      © 2026 Auth By Aman Gupta • Built with ❤️ & Security
    </div>
  </div>
</body>
</html>
`,

  welcome: (name) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Welcome</title>
<style>
  body {
    margin: 0;
    background: radial-gradient(circle at top, #0f172a, #020617);
    font-family: 'Segoe UI', sans-serif;
    color: #e5e7eb;
  }
  .container {
    max-width: 640px;
    margin: 40px auto;
    background: #020617;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 25px 60px rgba(0,0,0,0.7);
  }
  .header {
    padding: 70px 30px;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    text-align: center;
  }
  .header h1 {
    margin: 0;
    font-size: 34px;
  }
  .content {
    padding: 45px 30px;
    text-align: center;
  }
  .content h2 {
    font-size: 26px;
    margin-bottom: 15px;
  }
  .content p {
    font-size: 17px;
    line-height: 1.7;
    color: #cbd5f5;
  }
  .card {
    background: #020617;
    border: 1px solid #1e293b;
    border-radius: 14px;
    padding: 25px;
    margin: 15px 0;
  }
  .footer {
    padding: 25px;
    text-align: center;
    font-size: 13px;
    color: #94a3b8;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Welcome, ${name}!</h1>
    </div>

    <div class="content">
      <h2>Your account is ready 🚀</h2>
      <p>
        Your email has been successfully verified and your account is now active.
        Enjoy a secure, smooth, and modern authentication experience.
      </p>

      <div class="card">🔐 JWT-secured authentication</div>
      <div class="card">🧑‍🎨 Profile & avatar customization</div>
      <div class="card">♻ Password reset with OTP</div>
      <div class="card">⚡ Fast & reliable backend</div>
    </div>

    <div class="footer">
      © 2026 Auth By Aman Gupta • Security First 🔐
    </div>
  </div>
</body>
</html>
`,

  resetOtp: (name, otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Password Reset</title>
<style>
  body {
    margin: 0;
    background: radial-gradient(circle at top, #1f2937, #020617);
    font-family: 'Segoe UI', sans-serif;
    color: #e5e7eb;
  }
  .container {
    max-width: 640px;
    margin: 40px auto;
    background: #020617;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 25px 60px rgba(0,0,0,0.7);
  }
  .header {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    padding: 60px 30px;
    text-align: center;
  }
  .header h1 {
    margin: 0;
    font-size: 30px;
  }
  .content {
    padding: 45px 30px;
    text-align: center;
  }
  .otp {
    margin: 30px auto;
    padding: 25px 40px;
    border-radius: 16px;
    border: 2px dashed #ef4444;
    font-size: 40px;
    font-weight: 800;
    letter-spacing: 14px;
    color: #fca5a5;
    display: inline-block;
  }
  .alert {
    background: #7f1d1d;
    padding: 20px;
    border-radius: 12px;
    margin-top: 25px;
    font-size: 14px;
  }
  .footer {
    padding: 25px;
    text-align: center;
    font-size: 13px;
    color: #94a3b8;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔑 Password Reset</h1>
    </div>

    <div class="content">
      <h2>Hello ${name}</h2>
      <p>Use the OTP below to reset your password securely.</p>

      <div class="otp">${otp}</div>

      <p>This code expires in <strong>10 minutes</strong>.</p>

      <div class="alert">
        ⚠ If this wasn’t you, ignore this email and secure your account.
      </div>
    </div>

    <div class="footer">
      © 2026 Auth By Aman Gupta • Stay Secure 🔐
    </div>
  </div>
</body>
</html>
`
};
