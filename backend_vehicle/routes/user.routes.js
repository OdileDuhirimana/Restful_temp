const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const validate = require('../middleware/validate.middleware');
const { updateProfileSchema, changePasswordSchema } = require('../validations/user.validation');
const upload = require("../middleware/upload.middleware")

// Protect all routes below
router.use(auth.authenticate);

// GET user profile
router.get('/profile', userController.getProfile);

// Update user profile with optional profile image
router.put(
  '/profile',
  upload.single('profileImage'), // Accept form-data with image
  validate(updateProfileSchema),
  userController.updateProfile
);
// PUT change password
router.put('/change-password', validate(changePasswordSchema), userController.changePassword);

// GET list users (admin)
router.get('/', role.restrictTo('admin'), userController.listUsers);

// DELETE user (admin)
router.delete('/:id', role.restrictTo('admin'), userController.deleteUser);

module.exports = router;
