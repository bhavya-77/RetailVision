const mongoose = require('mongoose');


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } 
    
    catch (error) {
        console.log('MongoDB connection failed:', error.message);
    }
}

module.exports = connectDB;