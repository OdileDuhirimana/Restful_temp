const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db.config');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const vehicleRoutes = require('./routes/vehicle.routes');
const slotParkingRoutes = require("./routes/parkingSlot.routes")
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));


// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use("/api/parking-slots", slotParkingRoutes);


// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// Connect to DB and start server
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected.');

    // Sync database (Choose one depending on use case)
    // await sequelize.sync({ alter: true });  // Safe for dev changes
    await sequelize.sync({ alter: true });    //force: true Drops and recreates all tables (dangerous!)

    app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(' Unable to connect to the database:', err.message);
  }
})();
