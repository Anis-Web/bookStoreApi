const mongoose = require('mongoose')
const joi = require('joi')
const jwt = require('jsonwebtoken')


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlenght: 5,
    maxlength: 20,
    unique: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    minlenght: 2,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    minlenght: 6,
    maxlength: 200,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
})

// Generate token
UserSchema.methods.generateToken = function(){
  return jwt.sign({ 
      id: this._id, 
      isAdmin: this.isAdmin
    },
    process.env.JWT_SECRET_KEY
    // ,{expiresIn: "4d"}
  )
}

//User Model
const User = mongoose.model("User", UserSchema)

//Validate Register User
function validateRegisterUser(obj) {
  const schema = joi.object(
    {
      email: joi.string().trim().min(5).max(20).required().email(),
      username: joi.string().trim().min(2).max(30).required(),
      password: joi.string().min(6).max(200).required()
    }
  )
  return schema.validate(obj)
}

//Validate Loggin User
function validateLoginUser(obj) {
  const schema = joi.object(
    {
      email: joi.string().trim().min(5).max(20).required().email(),
      password: joi.string().min(6).max(200).required(),
    }
  )
  return schema.validate(obj)
}

//Validate Update User
function validateUpdateUser(obj) {
  const schema = joi.object(
    {
      email: joi.string().trim().min(5).max(20).email(),
      username: joi.string().trim().min(2).max(30),
      password: joi.string().min(6).max(200)
    }
  )
  return schema.validate(obj)
}

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser
}