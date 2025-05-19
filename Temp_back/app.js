const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes')
const userRoutes = require("./routes/UserRoutes")

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use('/api/auth', authRoutes)
app.use('/api/v1/', userRoutes)

app.get('/', (req, res) => {
  res.send('Vehicle Parking Management System API is running');
});

module.exports = app;
