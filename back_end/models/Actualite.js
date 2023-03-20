const mongoose = require('mongoose');
const ActualiteSchema = mongoose.Schema({
  title: { type: String, required: false },
  pubDate: { type: Date, required: false },
  content: { type: String, required: false },
  categories: { type: Array, required: false },
  link: { type: String, required: false },
  

});




module.exports = mongoose.model('Actualite', ActualiteSchema);