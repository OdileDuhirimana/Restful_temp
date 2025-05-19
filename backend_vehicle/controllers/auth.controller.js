const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
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

exports.register1 = async (req, res) => {
  const { name, email, password } = req.body;
  role = 'admin';

  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed, role });

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




