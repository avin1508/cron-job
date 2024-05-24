const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.MONGO_URI;
const connectDB = async () =>{
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        });
        console.log('Database Connected Successfully');
    } catch (error) {
        console.log('Error: ', error.message);
    }
}


module.exports = connectDB;