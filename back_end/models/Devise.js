const mongoose = require('mongoose');

const DeviseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  }
}, { strict: false });

module.exports = mongoose.model('Devise', DeviseSchema);
