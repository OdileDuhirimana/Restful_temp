// scripts/removeAdmin.js
require('dotenv').config();
const sequelize = require('../config/db');
const User = require('../models/User');

async function removeAdmin() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    const email = 'admin@example.com'; // Change if needed
    const admin = await User.findOne({ where: { email } });

    if (!admin) {
      console.log(`No admin found with email: ${email}`);
      return;
    }

    await admin.destroy();
    console.log(`✅ Admin with email ${email} has been removed.`);
  } catch (error) {
    console.error('❌ Error removing admin:', error.message);
  } finally {
    await sequelize.close();
  }
}

removeAdmin();
