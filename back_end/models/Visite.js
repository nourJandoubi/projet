const mongoose = require('mongoose');
// Définir un modèle pour enregistrer les visites
const VisiteSchema = new mongoose.Schema({
    date: { 
        type: Date,
        
      /*get: function(value) {
        const date = new Date(value);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return day-month-year;
      },
      set: (value) => new Date(value),
    */
     },
    count: { 
        type: Number,
        default: 0 
    }
  });

const Visite = mongoose.model('Visite', VisiteSchema);

module.exports = Visite;