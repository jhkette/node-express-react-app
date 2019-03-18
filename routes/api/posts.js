const express = require ('express');
const router = express.Router();

// @route GET request  apit/posts/test
// @route tests post router
// @ access public
router.get('/test', (req, res) => res.json({msg: "post works"}));


module.exports = router;