const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/Users');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator');


//helps create router habdlers
const router = express.Router();

//@route GET api/auth
//@desc Test route
//@access public
router.get('/', auth, async (req, res) => {
    //get user data excluding the password
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
});

//@route POST api/auth
//@desc Authenticate user & get token
//@access public
router.post('/', [
    //validations
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],

    async (req, res) => {
        const errors = validationResult(req);
        //send errors as a list of array
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
        //See if user exist
            let user = await User.findOne({ email });
            if(!user){
                return res.status(400).json({errors: [{ msg: 'Invalid Credentials' }]});
            }

        //match password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({errors: [{ msg: 'Invalid Credentials' }]});
        }
        
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