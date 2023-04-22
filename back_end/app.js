const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const Action = require('./models/Action');
const path = require('path');
const cron = require('node-cron');
const actionController = require('./controllers/action');
const actionRoutes = require('./routes/action');
const userRoutes = require('./routes/user');
const visiteRoutes=require('./routes/visite');
const actualiteRoutes = require('./routes/actualite');
const actualiteController = require('./controllers/actualite');
const userController = require('./controllers/user');
const visitorsMiddleware = require('./middleware/visitorsMiddleware');


const app = express();
app.use(visitorsMiddleware);

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://nour:nourJANDOUBI12345.@cluster0.0fu4qct.mongodb.net/test', 
{ useNewUrlParser: true, 
  useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));




app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



cron.schedule('* * * * *', () => {
  actualiteController.createActualite();
  console.log(" saved actualite")
}).start();

cron.schedule('* * * * *', () => {
  deviseController.createDevise()
  console.log(" saved devise")
}).start();


actionController.scrapeData();

 
 
  


app.use('/api/actualite',actualiteRoutes);
app.use('/api/action',actionRoutes);
app.use('/api/user',userRoutes);
app.use('/api/visitors',visiteRoutes);


module.exports = app;
