const jwt = require("jsonwebtoken");

if (process.env.NODE_ENV !== 'production') require('dotenv').config({ path: './.env' });

module.exports = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        req.user = 'unauthorized';
        req.errorMessage = 'No Token'
        console.log('no token')
        next();
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        console.log(req.user)
        next();
    } catch (e) {
        //console.error(e);
        req.user = 'unauthorized';
        req.errorMessage = 'Invalid Token'
        req.authError = e;
        console.log(req.user)
        next();
    }
};
