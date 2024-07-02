require('dotenv').config();
const mongoose = require("mongoose");


const mongoConnectionString = process.env.MONGO_URL;

mongoose.connect(mongoConnectionString)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

module.exports = mongoose.connection;
