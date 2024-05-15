const mongoose = require('mongoose');

const MONGO_DB_CONNECTION_STRING = process.env.MONGO_DB_CONNECTION_STRING;

const connectDataBase = async () => {
    try {
        await mongoose.connect(MONGO_DB_CONNECTION_STRING);
        console.log('Database connection successful');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = { connectDataBase };
