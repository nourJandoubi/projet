
const express= require('express')
const router = express.Router()
const protect=require('../middleware/authMiddleware')
const userController=require('../controllers/user')

router
  .route('/register/')
  .post(userController.registerUser)
router
.route('/login/')
.post(userController.authUser)

 


module.exports=router
