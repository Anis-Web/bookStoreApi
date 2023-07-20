const mongoose = require('mongoose')
const joi = require('joi')

const UserSchema = new mongoose.Schema(
  {
    email:{
      type:String,
      required:true,
      trim:true,
      minlength:5,
      maxlength:20,
      unique:true
    },
    username:{
      type:String,
      required:true,
      trim:true,
      minlength:2,
      maxlength:30
    },
    password:{
      required:true,
      minlength:6,
      maxlength:20
    },
    isAdmin:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true
  }
)

//User Model
const User = mongoose.model('User', UserSchema)

//Validate Register User
function validateRegisterUser(obj) {
  const schema = joi.object(
    {
      email: joi.string().trim().min(5).max(20).required().email(),
      username: joi.string().trim().min(2).max(30).required(),
      password: joi.min(6).max(20).required(),
      isAdmin: joi.bool()
    }
  )
  return schema.validate(obj)
}

//Validate Loggin User
function validateLogginUser(obj) {
  const schema = joi.object(
    {
      email: joi.string().trim().min(5).max(20).required().email(),
      password: joi.min(6).max(20).required(),
    }
  )
  return schema.validate(obj)
}

//Validate Update User
function validateUpdateUser(obj) {
  const schema = joi.object(
    {
      email: joi.string().trim().min(5).max(20).required().email(),
      username: joi.string().trim().min(2).max(30).required(),
      password: joi.min(6).max(20).required(),
      isAdmin: joi.bool()
    }
  )
  return schema.validate(obj)
}

module.exports = {
  User,
  validateRegisterUser,
  validateLogginUser,
  validateUpdateUser
}