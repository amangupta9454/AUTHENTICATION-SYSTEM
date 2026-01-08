require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');  // ← Add this
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ 
  origin: process.env.FRONTEND_URL, 
  credentials: true 
}));
app.use(express.json());
app.use(session({
  secret: process.env.JWT_SECRET || 'fallback_secret_for_session',  
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 }
}));
app.use(passport.initialize());
app.use(passport.session());  
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));