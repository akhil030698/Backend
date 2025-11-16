const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_URL ;
// grcmZa43iOBQUNKY mongodb-Password

mongoose.connect(mongoURL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });