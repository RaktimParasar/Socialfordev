const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../../models/Users');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const normalize = require('normalize-url');

//helps create router habdlers
const router = express.Router();

//@route POST api/users
//@desc Register users
//@access public
router.post('/', [
    //validations
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more character').isLength({ min:6 })
],

    async (req, res) => {
        const errors = validationResult(req);
        //send errors as a list of array
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;
        try {
        //See if user exist
            let user = await User.findOne({ email });
            if(user){
                return res.status(400).json({errors: [{ msg: 'User already exists' }]})
            }
        //Get user gravatar from email
            const avatar = normailze(gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            }), { forceHttps: true });

        //creating new user instance
            user = new User({
                name,
                email,
                password,
                avatar
            });
        //Encrypt password with bcrypt
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

        //Save user
        await user.save();

        //@JWT encoding
        //create payload
        const payload = {
            user: {
                id: user.id
            }
        };
        //signing token
        jwt.sign(payload, config.get('jwtSecret'),{
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });

        } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error')
        }

    });

module.exports = router;