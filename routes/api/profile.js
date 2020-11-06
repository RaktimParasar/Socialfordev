const express = require('express');

//helps create router habdlers
const router = express.Router();

//@route GET api/profile
//@desc Test route
//@access public
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;