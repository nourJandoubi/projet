
const express= require('express')
const router = express.Router()
const protect=require('../middleware/authMiddleware')
const userController=require('../controllers/user')
const visitorController=('../controllers/visitors')








router.post('/register/',userController.registerUser)
router.post('/login/',userController.authUser)
router.put('/update/',protect ,userController.updateUser)
router.get('/day/:day',userController.usersToday)
router.get('/lastweek',userController.usersLastWeek)
router.get('/month/:year/:month',userController.usersByMonth);
router.get('/year/:year',userController.usersByYear);
router.get('/total',userController.totalUsers);
router.get('/country',userController.usersByCountry);
router.get('/totalCountries',userController.totalCountries);
router.post('/verifierEmail',userController.verifierEmail);
router.delete('/:id',userController.supprimerCompte);

module.exports=router;
