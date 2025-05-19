const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../utils/upload');
const authController = require('../controllers/AuthController');

const router = express.Router();

router.get('/me', protect, authController.getMyProfile);
router.put('/update', protect, upload.single('profileImage'), authController.updateProfile);
router.put('/change-password', protect, authController.changePassword);
router.delete('/delete', protect, authController.deleteAccount);

module.exports = router;
