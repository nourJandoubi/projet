const mongoose = require('mongoose');
// Définir un modèle pour enregistrer les visites
const VisiteSchema = new mongoose.Schema({
    date: { 
        type: Date,
     },
    count: { 
        type: Number,
        default: 0 
    }
  });

const Visite = mongoose.model('Visite', VisiteSchema);

module.exports = Visite;