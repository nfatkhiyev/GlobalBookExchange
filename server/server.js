const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectToDatabase = require('./conn');

const getUserMiddleware = require('./middleware/getUserMiddleware');

const indexRouter = require('./routes/indexRouter');
const booksRouter = require('./routes/bookRouter');
const authRouter = require('./routes/authRouter');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/interiorPageLayout', 'layouts/indexLayout');
app.use(expressLayouts);
app.use(express.json());
app.use(expressSession ({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}));
app.use(bodyParser.json());
app.use(express.static('server/public'));

connectToDatabase();

app.use(cookieParser());
app.use(getUserMiddleware);

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/auth', authRouter);

app.listen(process.env.PORT || 3000);
