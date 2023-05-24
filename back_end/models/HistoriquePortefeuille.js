const mongoose = require('mongoose');

const historiquePortefeuilleSchema = new mongoose.Schema({
  dateOperation: {
     type: Date, 
     required: true 
    },
  typeInvestissement: { 
    type: String, 
    required: true 
},
  nombreAction: { 
    type: Number, 
    required: true 
},
  prixInvestissement: { 
    type: Number, 
    required: true 
},
  idPortefeuille: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Portefeuille', 
    required: true 
},
  idEntreprise: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Entreprise', 
    required: true 
}
});

module.exports  = mongoose.model('HistoriquePortefeuille', historiquePortefeuilleSchema);

