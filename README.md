<h1>🚀 Code-A-Nova Authentication System (MERN Stack)</h1>

<h2>📌 Project Description</h2>
<p>
Code-A-Nova Authentication System is a full-stack MERN-based authentication and user management project.
It provides secure user authentication using JWT, Google OAuth, email services, file uploads, and cloud storage.
The system is scalable, production-ready, and suitable for real-world applications.
</p>

<hr />

<h2>Folder Structure</h2>
<pre>
AUTH/
│
├── BACKEND/
│   ├── config/
│   │   ├── passport.js          # Google OAuth strategy
│   ├── controllers/
│   │   ├── authController.js
│   ├── models/
│   │   ├── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   ├── uploads/                # Temporary file uploads
│   ├── server.js               # App entry point
│   ├── package.json
│   └── .env
│
├── FRONTEND/
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── .env
│
└── README.md
</pre>

<hr />

<h2>🛠️ Tech Stack Used</h2>
<ul>
  <li>🎨 Frontend: React, Vite, Tailwind CSS</li>
  <li>🧠 Backend: Node.js, Express.js</li>
  <li>🗄️ Database: MongoDB</li>
  <li>🔐 Authentication: JWT, Google OAuth</li>
  <li>☁️ File Storage: Cloudinary</li>
  <li>🌍 Hosting: Netlify, Render</li>
</ul>

<hr />

<h2>📦 Backend Dependencies</h2>
<table border="1" cellpadding="8">
  <tr><th>📦 Package</th><th>📝 Purpose</th></tr>
  <tr><td>express</td><td>Backend framework</td></tr>
  <tr><td>mongoose</td><td>MongoDB ODM</td></tr>
  <tr><td>jsonwebtoken</td><td>JWT authentication</td></tr>
  <tr><td>bcryptjs</td><td>Password hashing</td></tr>
  <tr><td>passport</td><td>OAuth authentication</td></tr>
  <tr><td>passport-google-oauth20</td><td>Google OAuth</td></tr>
  <tr><td>cloudinary</td><td>Media storage</td></tr>
  <tr><td>multer</td><td>File uploads</td></tr>
  <tr><td>nodemailer</td><td>Email service</td></tr>
  <tr><td>resend</td><td>Email API</td></tr>
  <tr><td>cors</td><td>CORS handling</td></tr>
  <tr><td>dotenv</td><td>Environment variables</td></tr>
</table>

<hr />

<h2>📦 Frontend Dependencies</h2>
<table border="1" cellpadding="8">
  <tr><th>📦 Package</th><th>📝 Purpose</th></tr>
  <tr><td>react</td><td>UI library</td></tr>
  <tr><td>react-router-dom</td><td>Routing</td></tr>
  <tr><td>axios</td><td>API communication</td></tr>
  <tr><td>tailwindcss</td><td>Styling</td></tr>
  <tr><td>react-hot-toast</td><td>Notifications</td></tr>
  <tr><td>lucide-react</td><td>Icons</td></tr>
  <tr><td>vite</td><td>Build tool</td></tr>
</table>

<hr />
<h2>⚙️ Installation & Setup</h2>

<h3>📥 Clone Repository</h3>
<pre>
<!-- https://github.com/amangupta9454/AUTHENTICATION-SYSTEM.git -->
git clone https://github.com/your-username/AUTHENTICATION-SYSTEM.git
cd AUTHENTICATION-SYSTEM
</pre>

<h3>🔧 Backend Installation</h3>
<pre>
cd BACKEND
npm install
npm run dev
</pre>

<h3>🔧 Frontend Installation</h3>
<pre>
cd FRONTEND
npm install
npm run dev
</pre>

<hr />
<h2>🔑 Credentials & Environment Setup</h2>

<h3>🧠 Backend .env</h3>
<pre>
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:5173
</pre>

<hr />

<h3>🎨 Frontend .env</h3>
<pre>
VITE_API_URL=http://localhost:5000/api/auth
VITE_GOOGLE_CLIENT_ID=Google OAuth client ID
</pre>

<hr />

<h2>🚀 How to Use This Project</h2>
<ol>
  <li>Setup environment variables</li>
  <li>Start backend server</li>
  <li>Start frontend server</li>
  <li>Register a new user or login</li>
  <li>Authenticate using Google OAuth</li>
  <li>Upload profile image</li>
  <li>Access protected routes</li>
</ol>

<hr />

<h2>🔧 Core Functions</h2>
<ul>
   <li>🔐 User authentication</li>
  <li>🔑 JWT token management</li>
  <li>🌐 Google OAuth login</li>
  <li>☁️ Cloudinary file uploads</li>
  <li>🛡️ Protected APIs</li>
</ul>

 <hr> 
        <h2 id="enhancements">🚀 Future Enhancements</h2>
         <ul>
         <li>Role-based access control</li>
         <li>Refresh token implementation</li>
         <li>Admin dashboard</li>
         <li>Email templates</li>
         <li>OTP authentication</li>
            </ul> 

 <hr> 
            <h2 id="contact">📬 Contact Me</h2>
             <ul>
              <li><strong>Name:</strong> Aman Gupta</li>
               <li><strong>Email:</strong>  <a href="ag0567688@gmail.com">Send me an email</a> </li>
                <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/amangupta9454">LINKEDIN</a></li>
                 <li><strong>GitHub:</strong> <a href="https://github.com/amangupta9454">GITHUB</a></li>
                 <li><strong>Portfolio:</strong> <a href="http://gupta-aman-portfolio.netlify.app/">PORTFOLIO</a></li>
                  </ul> 
                  <hr>
                   <h2 id="creator">👨‍💻 Created By</h2> 
                   <p><strong>Aman Gupta</strong><br>B.Tech 3rd year Student | HIET Ghaziabad<br>Passionate about Tech and Development 🌱</p>
                    <p align="center">⭐ If you found this project helpful, give it a star!</p>
