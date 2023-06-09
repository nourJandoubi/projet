const jwt=require('jsonwebtoken')
const User=require('../models/user.js')
const expressAsyncHandler =require('express-async-handler')

const protect = expressAsyncHandler(async (req, res, next) => {
  let token
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      console.log('token', token)
      const decoded = jwt.verify(token, 'dorra')

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized , Token  failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized , No Token')
  }
})


module.exports=protect
