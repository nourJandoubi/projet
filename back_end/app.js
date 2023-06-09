const express = require('express');
const mongoose = require('mongoose');
const indiceRoutes = require('./routes/indice');
const cron = require('node-cron');
const actionController = require('./controllers/action');
const indiceController = require('./controllers/indice');
const actionRoutes = require('./routes/action');
const userRoutes = require('./routes/user');
const bourseRoutes = require('./routes/bourse');
const actualiteRoutes = require('./routes/actualite');
const actualiteController = require('./controllers/actualite');
const adminRoutes = require('./routes/admin');
const investorRoutes = require('./routes/investor');
const visitorsMiddleware = require('./middleware/visitorsMiddleware');
const deviseRoutes = require('./routes/devise');
const convertRoutes = require('./routes/convert');
const portefeuilleRoutes=require('./routes/portefeuille')
const historiqueRoutes=require('./routes/historiquePortefeuille');
const entrepriseRoutes = require('./routes/entreprise');
const app = express();
const passwordRoutes=require('./controllers/password')

mongoose.connect('mongodb+srv://nour:nourJANDOUBI12345.@cluster0.0fu4qct.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion to MongoDB successful!'))
  .catch(() => console.log('Connection to MongoDB failed!'));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



require('dotenv').config();

/*const archiveFilePath = process.env.ARCHIVE_FILE_PATH;
console.log('archiveFilePath:', archiveFilePath);



cron.schedule('* * * * *', () => {
  actualiteController.createActualite();
  console.log(" saved actualite")
}).start();

cron.schedule('* * * * *', () => {
  deviseController.createDevise()
  console.log(" saved devise")
}).start();

cron.schedule('* * * * *', () => {
  actionController.createAction();
  //actionController.archiveData();

// }).start();

//entrepriseController.createEntreprise();
 // entrepriseController.updateEntreprisesFromAPI();
//entrepriseController.createEntreprisesFromJSON();
//entrepriseController.deleteEntreprises();
cron.schedule('0 0 * * *', () => {
  actionController.stockPricesToDatabase()
  console.log('Saved action');
}).start();

*/

// cron.schedule('* * * * *', () => {
//   actionController.createAction();
//   actionController.archiveData();

//   console.log(" saved action")

// }).start();

//entrepriseController.createEntreprise();
 // entrepriseController.updateEntreprisesFromAPI();
//entrepriseController.createEntreprisesFromJSON();
//entrepriseController.deleteEntreprises();
cron.schedule('0 0 * * *', () => {
  actionController.stockPricesToDatabase()
  console.log('Saved action');
}).start();
 
//every 4 hours
cron.schedule('0 */4 * * *', () => {
  indiceController.createIndice(); 
});

// cron.schedule('0 */4 * * *', () => {
//   actualiteController.createActualite();
// });
actualiteController.createActualite();
//bourseController.createBourse();

//actionController.oldstockPricesToJson();

app.use(visitorsMiddleware);
app.use('/api/actualite', actualiteRoutes);
app.use('/api/action', actionRoutes);
app.use('/api/user', userRoutes);
app.use('/api/devise', deviseRoutes);
app.use('/api/convert', convertRoutes);
app.use('/api/indice', indiceRoutes);
app.use('/api/historique',historiqueRoutes);
app.use('/api/password',passwordRoutes);
app.use('/api/portefeuilles',portefeuilleRoutes);
app.use('/api/entreprise', entrepriseRoutes);
app.use('/api/bourse', bourseRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/investor',investorRoutes);
module.exports = app;
