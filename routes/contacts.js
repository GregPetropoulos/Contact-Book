const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// * DATABASES NEEDED
const User = require('../models/User');
const Contact = require('../models/Contact');


//* route    GET api/contacts
//* @desc     Get all users contacts
//* @access   Private
router.get('/', auth, async (req, res) => {
try {
// * Look into Contact db and locate the user field with object id that matches from the auth middleware request id 
  const contacts = await Contact.find({user: req.user.id}).sort({ date: -1})
res.json(contacts)

} catch (err) {
  console.error(err.message);
  req.statusCode(500).send('Server Error');
}
});

//* @route    POST api/contacts
//* @desc     Add new contacts
//* @access   Private
router.post('/', (req, res) => {
  res.send('Add users contacts');
});

//* @route    PUT api/contacts/:id
//* @desc     Update a contact
//* @access   Private
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

//* @route    DELETE api/contacts/:id
//* @desc     Delete a contact
//* @access   Private
router.delete('/:id', (req, res) => {
  res.send('Delete a contact');
});

module.exports = router;
