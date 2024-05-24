const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const cron = require('./services/cron');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));

// Initialize cron jobs
cron.start();
