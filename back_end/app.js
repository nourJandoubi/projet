const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const cron = require('node-cron');

const actualiteRoutes = require('./routes/actualite');
const actualiteController = require('./controllers/actualite');



const app = express();


mongoose.connect('mongodb+srv://nour:nourJANDOUBI12345.@cluster0.0fu4qct.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
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
    console.log("hi")
}).start();


app.use('/api/actualite', actualiteRoutes);



module.exports = app;

