<h1>Code-A-Nova Authentication System (MERN Stack)</h1>

<h2>Project Description</h2>
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
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── server.js
│   ├── package.json
│   ├── uploads
│   └── .env
│
├── FRONTEND/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │   └── App.jsx
│   ├── public/
│   ├── package.json
│   └── .env
│
└── README.md
</pre>

<hr />

<h2>Tech Stack Used</h2>
<ul>
  <li>Frontend: React, Vite, Tailwind CSS, Lucid Reacts, React-hot-tost</li>
  <li>Backend: Node.js, Express.js</li>
  <li>Database: MongoDB</li>
  <li>Authentication: JWT, Google OAuth</li>
  <li>File Storage: Cloudinary</li>
  <li>Hosting: Netlify (Frontend), Render (Backend)</li>
</ul>

<hr />

<h2>Backend Dependencies</h2>
<table border="1" cellpadding="8">
  <tr><th>Package</th><th>Purpose</th></tr>
  <tr><td>express</td><td>Backend framework</td></tr>
  <tr><td>mongoose</td><td>MongoDB ODM</td></tr>
  <tr><td>jsonwebtoken</td><td>JWT authentication</td></tr>
  <tr><td>bcryptjs</td><td>Password hashing</td></tr>
  <tr><td>passport</td><td>OAuth authentication</td></tr>
  <tr><td>passport-google-oauth20</td><td>Google login</td></tr>
  <tr><td>cloudinary</td><td>Media storage</td></tr>
  <tr><td>multer</td><td>File uploads</td></tr>
  <tr><td>nodemailer</td><td>Email service</td></tr>
  <tr><td>cors</td><td>Cross-origin handling</td></tr>
  <tr><td>dotenv</td><td>Environment variables</td></tr>
</table>

<hr />

<h2>Frontend Dependencies</h2>
<table border="1" cellpadding="8">
  <tr><th>Package</th><th>Purpose</th></tr>
  <tr><td>react</td><td>User interface library</td></tr>
  <tr><td>react-router-dom</td><td>Routing</td></tr>
  <tr><td>axios</td><td>API requests</td></tr>
  <tr><td>tailwindcss</td><td>Styling</td></tr>
  <tr><td>react-hot-toast</td><td>Notifications</td></tr>
  <tr><td>lucide-react</td><td>Icons</td></tr>
  <tr><td>vite</td><td>Build tool</td></tr>
</table>

<hr />

<h2>Backend Setup</h2>
<pre>
cd backend
npm install
npm run dev
</pre>

<h3>Backend .env Configuration</h3>
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

<h2>Frontend Setup</h2>
<pre>
cd frontend
npm install
npm run dev
</pre>

<h3>Frontend .env Configuration</h3>
<pre>
VITE_API_URL=http://localhost:5000/api/auth
VITE_GOOGLE_CLIENT_ID=your_google_client_id
</pre>

<hr />

<h2>How to Use This Project</h2>
<ol>
  <li>Clone the repository</li>
  <li>Configure backend environment variables</li>
  <li>Configure frontend environment variables</li>
  <li>Start backend server</li>
  <li>Start frontend server</li>
  <li>Register or login using Google</li>
  <li>Access protected routes</li>
</ol>

<hr />

<h2>Core Functions</h2>
<ul>
  <li>User registration and login</li>
  <li>JWT-based authentication</li>
  <li>Google OAuth login</li>
  <li>Secure password hashing</li>
  <li>Email notifications</li>
  <li>File uploads using Cloudinary</li>
  <li>Protected APIs</li>
</ul>

<hr />

<h2>Future Enhancements</h2>
<ul>
  <li>Role-based access control</li>
  <li>Refresh token support</li>
  <li>Admin dashboard</li>
  <li>Email templates</li>
  <li>OTP-based authentication</li>
  <li>Security optimizations</li>
</ul>

<hr />

<h2>Contact Us</h2>
<p>
<strong>Aman Gupta</strong><br />
Website: https://code-a-nova.online<br />
Email: support@code-a-nova.online
</p>
