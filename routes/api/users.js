const express = require ('express');
const router = express.Router();
// @route GET request  apit/users/test
// @route tests users router
// @ access public
router.get('/test', (req, res) => res.json({msg: "users works"}));


module.exports = router;