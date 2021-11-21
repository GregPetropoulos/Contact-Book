const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth =require('../middleware/auth')

//* GRABBING VARIABLE FROM .ENV
const jwtSecret = process.env.MY_JWT_SECRET;

//*PROTECT GLOBAL VARIABLES
require('dotenv').config();

const User = require('../models/User');

//* @route   GET api/auth
//* @desc     Get logged in user
//* @access   Private
router.get('/', auth, async (req, res) => {

try {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
} catch (err) {
  console.error(err.message);
  res.status(500).send('Server Error');
}
});

//* @route   POST api/auth
//* @desc     Auth user & get token
//* @access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      //* Check if there is matching email in the db
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      //* Check if the plaintext pw entered into the body matches the user found pw
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      //*  payload is the user from database object being sent in the payload 
      const payload = {
        user: {
          id: user.id
        }
      };

      //* signing the token and passing parameters(payload, jwt secret, option for expiration, callback)
      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: 3600000
        },
        (err, token) => {
          if (err) throw err;
          res.json({token});
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error')
    }
  }
);

module.exports = router;
