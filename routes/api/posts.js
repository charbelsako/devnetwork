const express = require('express')
const router = express.Router()

/* @route /api/posts/test
   @method GET
   @desc test post route
   @access public
*/
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }))

module.exports = router
