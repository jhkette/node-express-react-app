const express = require ('express');
const router = express.Router();
// @route GET request  apit/profile/test
// @route tests profile router
// @ access public
router.get('/test', (req, res) => res.json({msg: "profile works"}));


module.exports = router;