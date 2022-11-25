const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');

//return login page
router.get('/login', (req, res) => {
    res.render('auth/login');
});

//return sign-up page
router.get('/sign-up', (req, res) => {
    res.render('auth/signup', { layout: 'layouts/authPageLayout' });
});

//login route
router.post('/login', (req, res) => {
    //login
});

//sign up route
router.post('/sign-up', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({ min: 8 }).isAlphanumeric(),
    check('name', 'Please enter your name').not().isEmpty()
], async (req, res) => {
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        return res.status(400).json({
            errors: validationErrors.array(),
        });
    }

    const {
        email,
        password,
        name,
        address,
    } = req.body;

    try {
        let user = await User.findOne({
            email: email,
        });

        if(user) {
            return res.status(400).json({
                msg: 'User already exsts',
            });
        }

        user = new User({
            email,
            password,
            name,
            address,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        
        const payload = {
            user: {
                id: user._id,
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, {
                expiresIn: '1d',
            }, (err, token) => {
                if(err) throw err;
                res.status(200).json({
                    token
                });
            }
        );
    } catch(err) {
        console.log(err.message);
        res.status(500).send("Error in Sending");
    }
});

module.exports = router;
