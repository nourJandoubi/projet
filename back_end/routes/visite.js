const express = require('express');
const router = express.Router();
const visiteController = require('../controllers/visite');
router.post('/insert',visiteController.visitors, (req, res, next) => {
    res.send('Visite ajoutée avec succès! routeee');
  });
router.get('/day/:day', visiteController.visitorsToday);
router.get('/lastweek', visiteController.visitorsLastWeek);
router.get('/month/:year/:month',visiteController.visitorsByMonth);
router.get('/year/:year',visiteController.visitorsByYear);
router.get('/total',visiteController.totalVisitors);

module.exports = router;
