const express = require ('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const router = express.Router();
const passport = require('passport');

//load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


const User = require('../../models/User')
// @route GET request  apit/users/test
// @route tests users router
// @ access public
router.get('/test', (req, res) => res.json({msg: "users works"}));


// @route GET request  apit/users/register
// @desc register user
// @ access public
router.post('/register', (req, res) => {
  // use destructuring to pull errors and isvalid from validataeRegisterInput function
  // which takes req.body as a parameter. The function is in register
  const {errors, isValid} = validateRegisterInput(req.body);
  //check validation 
  if(!isValid){
    return res.status(400).json(errors)
  }
  
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm' // Default
        });
  
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar: avatar,
          password: req.body.password
        });
  
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

// @route GET request  apit/users/login
// @desc login return jwt web token
// @ access public

router.post('/login', (req, res) =>{

  const {errors, isValid} = validateLoginInput(req.body);
  const email = req.body.email;
  const password = req.body.password;

  
  User.findOne({email})
      .then(user =>{
        if(!user){
          errors.email = 'User not found';
          return res.status(404).json(errors)
        }

        // check password
        bcrypt.compare(password, user.password)
           .then(isMatch => {
             if(isMatch){
             const payload = {id: user.id, name: user.name, avater: user.avatar }

               jwt.sign(payload, keys.secretOrKey, 
                {expiresIn: 3600},
                (err, token) =>{
                  res.json({
                    success: true,
                    token: 'Bearer ' + token
                  });
                });
               
             } else{
               errors.password = 'Not the correct password';
               return res.status(400).json(errors);
             }
           })


      });
});


// @route GET request  api/users/current
// @desc return current user
// @ access private

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({

      id: req.user.id,
      name: req.user.name,
      email: req.user.email

    });
  }
);
module.exports = router;