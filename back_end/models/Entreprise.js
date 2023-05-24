const mongoose = require('mongoose');

const entrepriseSchema = new mongoose.Schema({
  // define your schema fields here
  symbol: {
    type: String,
    required: false,
    
},
nom: {
    type: String,
    required: false,
    
},
secteur: {
    type: String,
    required: false,
    
},
description: {
    type: String,
    required: false,
    
},
ville: {
    type: String,
    required: false,
    
},
pays: {
    type: String,
    required: false,
    
},
bourse: {
    type: String,
    required: false,
    
},
industrie: {
    type: String,
    required: false,
    
},
siteWeb: {
    type: String,
    required: false,
    
},
devise: {
    type: String,
    required: false,
    
},
prix: {
    type: String,
    required: false,
    
},
beta: {
    type: String,
    required: false,
    
},
volumeMoyen: {
    type: String,
    required: false,
    
},
capitalisation: {
    type: String,
    required: false,
    
},
plage: {
    type: String,
    required: false,
    
},
variation: {
    type: String,
    required: false,
    
},
cik: {
    type: String,
    required: false,
    
},
isin: {
    type: String,
    required: false,
    
},
cusip: {
    type: String,
    required: false,
    
},
pdg: {
    type: String,
    required: false,
    
},
nbEmployes: {
    type: String,
    required: false,
    
},
telephone: {
    type: String,
    required: false,
    
},
adresse: {
    type: String,
    required: false,
    
},
image: {
    type: String,
    required: false,
    
},
dateIntroductionBourse: {
    type: String,
    required: false,
    
},




  

});

const Entreprise = mongoose.model('Entreprise', entrepriseSchema);

module.exports = Entreprise;
