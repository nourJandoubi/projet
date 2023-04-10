const express = require('express');
const mongoose = require('mongoose');

const Action = require('./models/Action');
const path = require('path');
const cron = require('node-cron');
const actionController = require('./controllers/action');
const actionRoutes = require('./routes/action');
const actualiteRoutes = require('./routes/actualite');
const actualiteController = require('./controllers/actualite');
const deviseRoutes = require('./routes/devise');
const deviseController = require('./controllers/devise');



const app = express();


mongoose.connect('mongodb+srv://nour:nourJANDOUBI12345.@cluster0.0fu4qct.mongodb.net/test?retryWrites=true&w=majority&connectTimeoutMS=90000', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));




app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


const actualite = require('./models/Actualite');


cron.schedule('* * * * *', () => {
  actualiteController.createActualite();
  console.log(" saved actualite")
}).start();

cron.schedule('* * * * *', () => {
  deviseController.createDevise()
  console.log(" saved devise")
}).start();


  actionController.scrapeData();

 
 
  


app.use('/api/actualite', actualiteRoutes);
app.use('/api/action', actionRoutes);
app.use('/api/devise',deviseRoutes );
module.exports = app;
