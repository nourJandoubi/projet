
const bcrypt=require('bcryptjs')
const mongoose=require('mongoose')


const userSchema = mongoose.Schema(
  {
    name:{
        type:String,
        required: true
    },
    lastName:{
      type:String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    country:{
      type:String,
      required: true
    },
    password: {
      type: String,
      required: true,
    },
    registeredAt: {
      type: Date,
      required: true,
    },
    status:{
      type:String,
      required:true,
    }
  
  },
  
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log('entredPass',enteredPassword)
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

module.exports=User
