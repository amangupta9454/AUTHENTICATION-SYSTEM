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
const upload = multer({ dest: 'uploads/' });

router.post('/register', upload.single('avatar'), authController.register);
router.post('/login', authController.login);
router.get('/user', authMiddleware, authController.getUser);

module.exports = router;