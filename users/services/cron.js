const cron = require('node-cron');
const axios = require('axios');
const User = require('../models/User');
const { sendEmail } = require('./emailService');
require('dotenv').config();

cron.schedule('0 22 * * *', async () => {
  try {
    const response = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/api/products/low-stock`);
    const lowStockProducts = response.data;
    const admins = await User.find({ role: 'ADMIN' });

    admins.forEach(admin => {
      sendEmail(admin.email, 'Low Stock Alert', JSON.stringify(lowStockProducts, null, 2));
    });
  } catch (error) {
    console.error('Error during cron job:', error);
  }
});

exports.start = () => {

};
