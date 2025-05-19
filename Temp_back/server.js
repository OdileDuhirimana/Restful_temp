const app = require('./app');
const sequelize = require('./config/db');
const User = require('./models/User'); // Import your models here

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    await sequelize.sync({ alter: false }); // Sync models

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();
