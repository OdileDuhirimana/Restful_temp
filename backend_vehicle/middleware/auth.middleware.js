const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ message: 'Access denied' });
  next();
};

module.exports = { authenticate, isAdmin };
