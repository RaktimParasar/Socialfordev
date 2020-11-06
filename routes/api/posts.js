const express = require('express');

//helps create router habdlers
const router = express.Router();

//@route GET api/posts
//@desc Test route
//@access public
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;