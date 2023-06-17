const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
router.post('/insert',adminController.visitors);
router.get('/day/:day', adminController.visitorsToday);
router.get('/lastweek', adminController.visitorsLastWeek);
router.get('/month/:year/:month',adminController.visitorsByMonth);
router.get('/year/:year',adminController.visitorsByYear);
router.get('/total',adminController.totalVisitors);

module.exports = router;