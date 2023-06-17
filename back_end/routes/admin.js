const express= require('express')
const router = express.Router()
const adminController=require('../controllers/admin')
router.get('/day/:day',adminController.usersToday)
router.get('/lastweek',adminController.usersLastWeek)
router.get('/month/:year/:month',adminController.usersByMonth);
router.get('/year/:year',adminController.usersByYear);
router.get('/total',adminController.totalUsers);
router.get('/country',adminController.usersByCountry);
router.get('/totalCountries',adminController.totalCountries);
module.exports=router;
