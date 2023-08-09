const asyncHandler = require('express-async-handler')
const { User, validateChangePassword } = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

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

  const transporter = nodemailer.createTransport({
    service: 'yandex',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_Pass
    }
  })

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: user.email,
    subject: 'Reset Password',
    html: `
      <div>
        <h4>Click on the link below to reset your password</h4>
        <p>${link}</p>
      </div>
    `
  }

  transporter.sendMail(mailOptions, function(error,success){
    if(error){
      console.log(error)
      res.status(500).json({
        message: 'Somthing went wrong'
      })
    }else{
      console.log(`Email sent: ${success.response}`)
      res.render('link-send')
    }
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
  const { error } = validateChangePassword(req.body)
  if(error){
    return res.status(400).json({
      message: error.details[0].message
    })
  }

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