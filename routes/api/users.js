const express = require('express')
const router = express.Router()

/* @route /api/users/test
   @method GET
   @desc test users route
   @access public
*/
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }))

module.exports = router
