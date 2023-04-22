const mongoose = require('mongoose');
const ActionSchema = mongoose.Schema({
  nomBourse: { type: String, required: true },
  pubDate: { type: Date, required: true },
  nomEntreprise: { type: String, required: true },
  cours: { type: String, required: true },
  variation: { type: String, required: true },
  ouv: { type: String, required: true },
  haut: { type: String, required: true },
  bas: { type: String, required: true },
  volume: { type: String, required: true },
  

});




module.exports = mongoose.model('Action', ActionSchema);