
const mongoose = require('mongoose');
const ActualiteSchema = mongoose.Schema({
  newsTitle: { 
    type: String, 
    required: false 
  },
  newsUrl: { 
    type: String, 
    required: false 
  },
  postedBy: { 
    type: String, 
    required: false 
  },
  postedOn: { 
    type: String, 
    required: false 
  },
  shotDesc: { 
    type: String, 
    required: false 
  },
  

});




module.exports = mongoose.model('Actualite', ActualiteSchema);