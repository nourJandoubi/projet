const express = require('express');
const mongoose = require('mongoose');
const Action = require('./models/Action');
const path = require('path');
const cron = require('node-cron');
const actionController = require('./controllers/action');
const actionRoutes = require('./routes/action');
const userRoutes = require('./routes/user');
const visiteRoutes = require('./routes/visite');
const actualiteRoutes = require('./routes/actualite');
const actualiteController = require('./controllers/actualite');
const userController = require('./controllers/user');
const visitorsMiddleware = require('./middleware/visitorsMiddleware');
const deviseRoutes = require('./routes/devise');
const deviseController = require('./controllers/devise');
const app = express();



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
// Serve static files with the correct MIME type
app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.match(/\.css$/)) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));
app.use('/path/to/font-awesome', express.static('path/to/font-awesome', {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));




require('dotenv').config();

const archiveFilePath = process.env.ARCHIVE_FILE_PATH;
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
  actionController.archiveData();

  console.log(" saved action")

}).start();




  




app.use(visitorsMiddleware);
app.use('/api/actualite', actualiteRoutes);
app.use('/api/action', actionRoutes);
app.use('/api/user', userRoutes);
app.use('/api/visitors', visiteRoutes);
app.use('/api/devise', deviseRoutes)



module.exports = app;
