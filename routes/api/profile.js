const express = require('express')
const router = express.Router()

/* @route /api/profile/test
   @method GET
   @desc test profile route
   @access public
*/
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }))

module.exports = router
