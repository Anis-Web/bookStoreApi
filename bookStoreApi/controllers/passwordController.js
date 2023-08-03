const asyncHandler = require('express-async-handler')
const { User } = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

/**
 * @desc Get forgot password view
 * @route /password/forgot-password
 * @method Get
 * @access public
 */
module.exports.getFrogotPasswordView = asyncHandler((req,res) => {
  //from Views folder
  res.render('forgot-password')
})

/**
 * @desc Send forgot password link
 * @route /password/forgot-password
 * @method Post
 * @access public
 */
module.exports.sendFrogotPasswordLink = asyncHandler(async (req,res) => {
  const user = await User.findOne({email: req.body.email})
  if(!user) {
    return res.status(404).json({
      message: 'user not found'
    })
  }

  const secret = process.env.JWT_SECRET_KEY + user.password
  const token = jwt.sign({
    email: user.email,
    id: user.id
  },
  secret,
  {
    expiresIn: '10m'
  })

  const link = `http://localhost:${process.env.PORT}/password/reset-password/${user._id}/${token}`

  res.json({
    message: 'Click on the link', resetPasswordLink: link
  })
})

/**
 * @desc Get reset password view
 * @route /password/reset-password/:userId/:token
 * @method Get
 * @access public
 */
module.exports.getResetPasswordView = asyncHandler(async (req,res) => {
  const user = await User.findById(req.params.userId)
  if(!user) {
    return res.status(404).json({
      message: 'user not found'
    })
  }

  const secret = process.env.JWT_SECRET_KEY + user.password
  
  try {
    jwt.verify(req.params.token, secret)
    res.render('reset-password', {email: user.email})
  } catch (error) {
    console.log(error)
    res.status(404).json({message: 'Error'})
  }
})

/**
 * @desc Reset password
 * @route /password/reset-password/:userId/:token
 * @method Post
 * @access public
 */
module.exports.resetThePassword = asyncHandler(async (req,res) => {
  const user = await User.findById(req.params.userId)
  if(!user) {
    return res.status(404).json({
      message: 'user not found'
    })
  }

  const secret = process.env.JWT_SECRET_KEY + user.password
  
  try {
    jwt.verify(req.params.token, secret)

    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password, salt)

    user.password = req.body.password

    await user.save()
    res.render('success-password')
  } catch (error) {
    console.log(error)
    res.status(404).json({message: 'Error'})
  }
})