const mongoose = require('mongoose');

const connectDB = async () => {
    const MongoURI = process.env.MONGO_URI;  // Load the URI from environment variable

    if (!MongoURI) {
        console.error('MongoDB URI is not defined');
        process.exit(1);
    }

    try {
        await mongoose.connect(MongoURI);
        console.log(`DB Connected successfully`);
    } catch (error) {
        console.error(`Error while connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
