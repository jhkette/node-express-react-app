const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


//load profile model
const Profile = require('../../models/Profile');


const User = require('../../models/User');




// @route GET request  apit/profile/test
// @route tests profile router
// @ access public
router.get('/test', (req, res) => res.json({msg: "profile works"}));

// @route GET request  apit/profile/
// @route gets profile
// @ access private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res)=>{
    const errors = {};
   Profile.findOne({user: req.user.id})
   .then(profile =>{
       if(!profile){
           errors.noprofile = 'there is no profile for this user';
           return res.status(404).json(errors)
       }
   })
   .catch(err => res.status(404).json(err));
})

module.exports = router;