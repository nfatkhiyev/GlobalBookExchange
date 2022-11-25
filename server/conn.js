const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path:'./.env'});
};

const connectToDatabasae = () => {


    mongoose.connect(process.env.DATABASE_URI, {
        useNewUrlParser: true
    });

    const db = mongoose.connection
    db.on('error', error => console.error(error));
    db.once('open', () => console.log('Connection to db successful!'));
};

module.exports = connectToDatabasae;
