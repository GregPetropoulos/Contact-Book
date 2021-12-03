const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// * DATABASES NEEDED
const User = require('../models/User');
const Contact = require('../models/Contact');

//* route    GET api/contacts
//* @desc     Get all users contacts
//! @access   Private
router.get('/', auth, async (req, res) => {
  try {
    // * Look into Contact db and locate the user field with object id that matches from the auth middleware request id
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    req.statusCode(500).send('Server Error');
  }
});

//* @route    POST api/contacts
//* @desc     Add new contacts
//! @access   Private
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, notes, website, birthday, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        notes,
        website,
        birthday,
        user: req.user.id
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//* @route    PUT api/contacts/:id
//* @desc     Update a contact
//! @access   Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, notes, website, birthday, type } = req.body;

  // console.log('hit', contactFields)

  //* Build a contact
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (notes) contactFields.notes = notes;
  if (website) contactFields.website = website;
  if (birthday) contactFields.birthday = birthday;
  if (type) contactFields.type = type;



  try {
    // * id of contact in db matches the params in route
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // *Make sure user owns the contact and other users can't change each others contacts
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }
//* THE UPDATE
    contact = await Contact.findByIdAndUpdate(
      req.params.id,

      // * In mongoDB The $set operator replaces the value of a field with the specified value.
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//* @route    DELETE api/contacts/:id
//* @desc     Delete a contact
//! @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    //* id of contact in db matches the params in route
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    //* Make sure user owns the contact and other users can't change each others contacts
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }
//* THE DELETE
 await Contact.findByIdAndRemove(req.params.id);


    res.json({msg :'Contact removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
