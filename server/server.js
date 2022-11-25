const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const connectToDatabase = require('./conn');

const indexRouter = require('./routes/indexRouter');
const booksRouter = require('./routes/bookRouter');
const authRouter = require('./routes/authRouter');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/interiorPageLayout', 'layouts/indexLayout');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}));
app.use(express.static('server/public'));

connectToDatabase();

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/auth', authRouter);

app.listen(process.env.PORT || 3000);
