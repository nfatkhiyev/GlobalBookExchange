const express = require('express');
const { check, validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const UserModel = require('../models/user');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './.env' });
}

//return login page
router.get('/login', (req, res) => {
    if (res.locals.user != 'unauthorized') {
        res.render('auth/login', { layout: 'layouts/authPageLayout', error: 'Already Logged In', });
    } else {
        res.render('auth/login', { layout: 'layouts/authPageLayout', error: '', });
    }
});

//logout and redirect to homepage
router.get('/logout', (req, res) => {
    res.clearCookie('authToken');
    res.locals.user = 'unauthorized';
    res.status(200).redirect('/');
});

//return sign-up page
router.get('/sign-up', (req, res) => {
    res.render('auth/signup', { layout: 'layouts/authPageLayout', error: '', });
});

//login route
router.post('/login', [
    check('loginEmailInput', 'Please enter a valid email').isEmail().normalizeEmail(),],
    async (req, res) => {
        //login
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.stats(400).json({
                errors: validationErrors.array(),
            });
        }
        const email = req.body.loginEmailInput;
        const password = req.body.loginPasswordInput;

        try {
            let user = await UserModel.findOne({
                email: email,
            });

            if (!user) return res.status(400).json({ message: "User Does Not Exist" });

            bcrypt.compare(password, user.passwordHash, (err, bres) => {
                if (err) {
                    console.log(err);
                    res.render('auth/login', { layout: 'layouts/authPageLayout', error: 'Error' });
                }
                else if (bres) {
                    const payload = {
                        user: {
                            id: user.id,
                        }
                    };

                    jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '1d'
                        },
                        (err, token) => {
                            if (err) throw err;
                            res.cookie('authToken', token);
                            res.status(200).redirect('/').json({
                                token
                            });
                        }
                    );
                }
                else {
                    res.render('auth/login', { layout: 'layouts/authPageLayout', error: 'Incorrect Password' });
                }
            });

        } catch (err) {
            console.error(err);
            res.render('auth/login', { layout: 'layouts/authPageLayout', error: 'Incorrect Password' });
        }
    });

//sign up route
router.post('/sign-up', [
    check('signupEmailInput', 'Please enter a valid email').isEmail().normalizeEmail(),
    check('signupPasswordInput', 'Please enter a longer password').isLength({ min: 8 }),
    check('signupPasswordInput', 'Password failed RegEx').matches(/(?=[A-Za-z0-9\W]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W])(?=.{8,}).*$/g),
    check('signupPasswordInput', 'Passwords do not match').custom((passwordInput, { req }) => passwordInput === req.body.signupConfirmPasswordInput),
    check('signupFirstNameInput', 'Please enter your first name').not().isEmpty(),
    check('signupLastNameInput', 'Please enter you last name').not().isEmpty(),],
    async (req, res) => {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({
                errors: validationErrors.array(),
            });
        }

        const firstName = req.body.signupFirstNameInput;
        const lastName = req.body.signupLastNameInput;
        const email = req.body.signupEmailInput;
        const password = req.body.signupPasswordInput;
        const addressLineOne = req.body.signupAddressOne;
        const addressLineTwo = req.body.signupAddressTwo;
        const addressLineThree = req.body.signupAddressThree;
        const addressLineFour = req.body.signupAddressFour;
        const addressLineFive = req.body.signupAddressFive;

        const name = {
            firstName,
            lastName,
        };

        const address = {
            addressOne: addressLineOne,
            addressTwo: addressLineTwo,
            addressThree: addressLineThree,
            cityLine: addressLineFour,
            countryLine: addressLineFive,
        }

        try {
            let user = await UserModel.findOne({
                email: email,
            });

            if (user) {
                return res.render('auth/signup', { layout: 'layouts/authPageLayout', error: 'User Already Exists' });
            }

            user = new UserModel({
                email: email,
                passwordHash: password,
                name: name,
                address: address,
            });

            const salt = await bcrypt.genSalt(10);
            user.passwordHash = await bcrypt.hash(password, salt);

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
                if (err) throw err;
                res.cookie('authToken', token);
                res.status(200).redirect('/').json({
                    token
                });
            }
            );
        } catch (err) {
            console.log(err.message);
            res.send("Error in Sending");
        }
    });

module.exports = router;
