const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { registerSchema, loginSchema} = require("../validators/authValidator")


router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/admin-only', protect, restrictTo('admin'), (req, res) => {
  res.json({ message: 'Admin content' });
});


module.exports = router;
