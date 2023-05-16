const mongoose = require('mongoose');
const { Schema } = mongoose;

const BourseSchema = mongoose.Schema({
  nom: { type: String, required: false },
  entreprises: [{ type: Schema.Types.ObjectId, ref: 'Entreprise' }]
});
  
module.exports = mongoose.model('Bourse', BourseSchema);