const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
  nomEntreprise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entreprise',
    required: false
  },
  
  cours: {
    type: String,
    required: false
  },
  variation: {
    type: String,
    required: false
  },
  ouverture: {
    type: String,
    required: false
  },
  haut: {
    type: String,
    required: false
  },
  bas: {
    type: String,
    required: false
  },
  cloture: {
    type: String,
    required: false
  },
  
});

module.exports = mongoose.model('Action', actionSchema);
