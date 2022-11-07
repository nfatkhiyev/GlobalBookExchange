if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
};

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true
});

const db = mongoose.connection
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connection to db successful!'));
