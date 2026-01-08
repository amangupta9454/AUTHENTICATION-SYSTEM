const express = require('express');
const passport = require('passport');
const multer = require('multer');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
require('../config/passport'); 
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
router.post('/register', upload.single('avatar'), authController.register);
router.post('/login', authController.login);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), authController.googleCallback);
router.get('/user', authMiddleware, authController.getUser);

module.exports = router;