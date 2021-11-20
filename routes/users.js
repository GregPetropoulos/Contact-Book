const express = require('express');

const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//* GRABBING VARIABLE FROM .ENV
const jwtSecret = process.env.MY_JWT_SECRET;

//*PROTECT GLOBAL VARIABLES
require('dotenv').config();

const User = require('../models/User');

//* @route   POST api/users
//* @desc     Register a new user
//* @access   Public
router.post(
  '/',
  [
    //* validating the form
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //* de-structured req.body
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      //* new up a user from info coming from req.body ln 26
      user = new User({
        name,
        email,
        password
      });
      //* encrypting (hashing) the password before saved to db using bcryptjs
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //*  payload is the object being sent in the payload
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
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
