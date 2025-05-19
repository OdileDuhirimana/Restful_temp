// scripts/createAdmin.js
require('dotenv').config();
const bcrypt = require('bcrypt');
const sequelize = require('../config/db');
const User = require('../models/User');

async function createAdmin() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    const existingAdmin = await User.findOne({ where: { email: 'admin@example.com' } });

    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.email);
      return;
    }

    const hashedPassword = await bcrypt.hash('Admin@123', 10); // Change password as needed

    const admin = await User.create({
      name: 'Super Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin', // Make sure your User model supports this
    });

    console.log('✅ Admin created successfully:', admin.email);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  } finally {
    await sequelize.close();
  }
}

createAdmin();
