// const express = require('express');
// const multer = require('multer');
// const authController = require('../controllers/authController');
// const authMiddleware = require('../middleware/authMiddleware');

// const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

// router.post('/register', upload.single('avatar'), authController.register);
// router.post('/login', authController.login);
// router.get('/user', authMiddleware, authController.getUser);

// module.exports = router;
const express = require('express');
const multer = require('multer');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Use memory storage – critical for Vercel (no disk write)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post('/register', upload.single('avatar'), authController.register);
router.post('/login', authController.login);
router.get('/user', authMiddleware, authController.getUser);

module.exports = router;