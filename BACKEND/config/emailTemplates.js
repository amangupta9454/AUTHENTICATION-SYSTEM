module.exports = {
  welcome: (name) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; }
        p { color: #555; }
        .footer { margin-top: 20px; font-size: 12px; color: #888; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome, ${name}!</h1>
        <p>Thank you for registering with us. We're excited to have you on board.</p>
        <p>If you have any questions, feel free to reach out.</p>
        <div class="footer">
          <p>Best regards,<br>Your App Team</p>
        </div>
      </div>
    </body>
    </html>
  `,
};