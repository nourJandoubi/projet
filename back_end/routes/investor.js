const express= require('express')
const router = express.Router()
const investorController=require('../controllers/investor')

router.get('/day/:day',investorController.usersToday)
router.get('/lastweek',investorController.usersLastWeek)
router.get('/month/:year/:month',investorController.usersByMonth);
router.get('/year/:year',investorController.usersByYear);
router.get('/total',investorController.totalUsers);
router.get('/country',investorController.usersByCountry);
router.get('/totalCountries',investorController.totalCountries);
module.exports=router;
