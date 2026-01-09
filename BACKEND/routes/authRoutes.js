// const express = require('express');
// const multer = require('multer');
// const authController = require('../controllers/authController');
// const authMiddleware = require('../middleware/authMiddleware');

// const router = express.Router();

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

// router.post('/register', upload.single('avatar'), authController.register);
// router.post('/verify-otp', authController.verifyOtp);
// router.post('/login', authController.login);
// router.get('/user', authMiddleware, authController.getUser);

// module.exports = router;
// routes/authRoutes.js (updated with new routes)
const express = require('express');
const multer = require('multer');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/register', upload.single('avatar'), authController.register);
router.post('/verify-otp', authController.verifyOtp);
router.post('/login', authController.login);
router.get('/user', authMiddleware, authController.getUser);
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-reset-otp', authController.verifyResetOtp);
router.post('/reset-password', authMiddleware, authController.resetPassword);

module.exports = router;