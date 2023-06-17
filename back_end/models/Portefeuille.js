const mongoose = require('mongoose');
//const indiceSchema = require('./Indice');

const portefeuilleSchema = mongoose.Schema({
  nomPortefeuille: {
    type: String,
    required: false
  },
  soldeTotal: {
    type: Number,
    required: true,
    default:0
  },
  prixTitres: {
    type: Number,
    required: true,
    default:0

  },
  liquidites: {
    type: Number,
    required: true,
    default:0

  },
  dateCreation: {
    type: Date,
    default: Date.now,
    required: true
  },
  indices: {
    type: [],
    required: false
  },
  idUser:{
    type: mongoose.Schema.Types.ObjectId, 
    ref:'Users'
  }
});
// Définition de l'index composé
//portefeuilleSchema.index({ idUser: 1, nomPortefeuille: 1 }, { unique: true });


module.exports = mongoose.model('Portefeuille', portefeuilleSchema);