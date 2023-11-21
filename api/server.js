const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const port = process.env.PORT || 4000;

const app = require('./app');

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log('Successfully connected to database.');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

