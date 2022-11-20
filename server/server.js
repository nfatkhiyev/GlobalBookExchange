if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path:'./.env'});
};

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/book-router');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/interiorPageLayout', 'layouts/indexLayout');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}));
app.use(express.static('server/public'));

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true
});

const db = mongoose.connection
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connection to db successful!'));

app.use('/', indexRouter);
app.use('/books', booksRouter);

app.listen(process.env.PORT || 3000);
