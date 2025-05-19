const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

// GET /api/users/profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role', 'profileImage']
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/users/profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, email } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;

    if (req.file) {
      user.profileImage = req.file.path;
    }

    await user.save();
    res.json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/users/change-password
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/users?page=1&limit=10&search=term
const listUsers = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await User.findAndCountAll({
      where: {
        name: { [Op.like]: `%${search}%` }
      },
      offset: parseInt(offset),
      limit: parseInt(limit),
      attributes: ['id', 'name', 'email', 'role', 'profileImage'],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      total: count,
      page: parseInt(page),
      users: rows
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/users/:id (admin)
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  listUsers,
  deleteUser
};
