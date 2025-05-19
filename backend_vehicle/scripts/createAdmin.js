require('dotenv').config();
const bcrypt = require('bcrypt');
const sequelize = require('../config/db.config');
const User = require('../models/user.model');

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // Ensure tables exist

    const existingAdmin = await User.findOne({ where: { email: 'admin@example.com' } });

    if (existingAdmin) {
      console.log(' Admin already exists.');
      process.exit();
    }

    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    const admin = await User.create({
      name: 'Super Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log(' Admin created:', {
      id: admin.id,
      email: admin.email,
      role: admin.role
    });

    process.exit();
  } catch (err) {
    console.error('❌ Failed to create admin:', err.message);
    process.exit(1);
  }
})();
