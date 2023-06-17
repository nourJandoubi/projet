const mongoose = require('mongoose');

const IndiceSchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
        
    },
    last: {
        type: String,
        required: false,
        
    },
    high: {
        type: String,
        required: false,
        
    },
    low: {
        type: String,
        required: false,
        
    },
    change: {
        type: String,
        required: false,
        
    },
    changePercentage: {
        type: String,
        required: false,
        
    },
   time: {
        type: String,
        required: false,
        
    },

  
}, { strict: false });

module.exports = mongoose.model('Indice', IndiceSchema);
