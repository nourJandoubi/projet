
const express= require('express')
const router = express.Router()
const protect=require('../middleware/authMiddleware')
const userController=require('../controllers/user')
const visitorController=('../controllers/visitors')








router.post('/register/',userController.inscription)
router.post('/login/',userController.seConnecter)
router.put('/update/',protect ,userController.modifierProfile)

router.post('/verifierEmail',userController.verifierEmail);
router.delete('/:id',userController.supprimerCompte);

module.exports=router;
