module.exports = {
  welcome: (name) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
        .container { max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px; }
        h1 { color: #333; }
        p { color: #555; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome, ${name}! 👋</h1>
        <p>Thank you for joining our app. We're thrilled to have you!</p>
        <p>Get started and explore all the features.</p>
        <p>Best,<br>The Team</p>
      </div>
    </body>
    </html>
  `,
};