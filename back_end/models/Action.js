const mongoose = require('mongoose');
const ActionSchema = mongoose.Schema({
  nomBourse: { type: String, required: false },
  pubDate: { type: Date, required: false },
  nomEntreprise: { type: String, required: false },
  cours: { type: String, required: false },
  variation: { type: String, required: false },
  ouv: { type: String, required: false },
  haut: { type: String, required: false },
  bas: { type: String, required: false },
  volume: { type: String, required: false },
  

});




module.exports = mongoose.model('Action', ActionSchema);