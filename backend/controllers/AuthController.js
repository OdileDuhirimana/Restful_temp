const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Joi = require('joi');

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed });

    const token = generateToken(user);

    res.status(201).json({ user: { id: user.id, name, email }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);

    res.json({ user: { id: user.id, name: user.name, email }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;

    if (req.file) {
      user.profileImage = req.file.path; // Save uploaded image path
    }

    await user.save();

    res.json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: 'Password updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'email', 'role', 'profileImage'],
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAccount = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


