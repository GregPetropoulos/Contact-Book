const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  type: {
    type: String,
    default: 'personal'
  },
  notes: {
    type: String
  },
  website: {
    type: String
  },
  birthday: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now()
  }
});
module.exports = mongoose.model('contact', ContactSchema);
