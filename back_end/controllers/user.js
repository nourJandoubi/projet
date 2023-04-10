const asyncHandler=require('express-async-handler')
const User=require('../models/user')
const generateToken=require('../utils/generateToken')
const emailValidator=require('deep-email-validator')
//@desc authenticate user and send login mail
// @route POST /api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { email } = req.body
  const password = req.body.password

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    let { password, ...newUser } = user.toObject()
    res.json({
      success: true,
      user: newUser,
      token: 'Bearer ' + generateToken(user._id),
    })
  } else {
    res.json({
      success: false,
    })
  }
})
//mail validator
async function isEmailValid(email) {
    return emailValidator.validate(email)
  }
const registerUser = asyncHandler(async (req, res) => {
  const { email } = req.body
  //const {valid,reason,validators}=isEmailValid("d@gmail.com")
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    res.send({
        error:'User already exists',
        success:false
    })
  }
  /*if (!valid)
  {
    res.status(400)
    res.send({
        message:"Please provide a valid email",
        reason:validators[reason]
    })
  }*/
  const user = await User.create({
    ...req.body,
  })
  if (user) {
    let { password, ...newUser } = user.toObject()
    res.status(201).json({
      success: true,
      user: newUser,
      token: 'Bearer' + generateToken(user._id),
    })
  } else {
    res.json({
      success: false,
    })
  }
})



const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json(
      {
        user,
      }.select('-password')
    )
  } else {
    res.status(404)
    throw new Error('Inalid email or passowrd')
  }
})


const updateUser = asyncHandler(async (req, res) => {
  
  //new ObjectId("6372e61fd1833a13aae50944")
  // console.log(req.user.__type)

    const user = await Employeur.findById(req.user._id.valueOf())
    console.log(user);
    if (user) {
      user.email = req.body.email||user.email,
      user.password= req.body.password || user.password,
      user.name = req.body.name || user.name
    }
      const updatedUser = await user.save();
      if (updatedUser) {
        res.status(200).json({
          _id: user._id,
          type: user.__type,
          token: generateToken(user._id),
        })
      }
      else {
        res.status(404)
        throw new Error('Something went wrong')
   
    } 

  }


)





module.exports={   authUser,
  registerUser,
  updateUser,
  getUserProfile
}
