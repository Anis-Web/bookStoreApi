const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const { 
  User, 
  validateUpdateUser, 
} = require("../models/User")

/**
 * @desc    UpdateUser
 * @route   /api/users/:id
 * @method  Put
 * @access  private
 */
const updateUser = asyncHandler(
  async (req,res) => {
    const { error } = await validateUpdateUser(req.body)
    if(error){
      res.status(400).json({
        message: error.details[0].message
      })
    }
    

    if(req.body.password){
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email,
          password: req.body.password,
          username: req.body.username
        }
      },
      {
        new: true
      }
    ).select("-password")

    res.status(200).json(updatedUser)
  }
)

/**
 * @desc    Get all users
 * @route   /api/users
 * @method  Get
 * @access  private (only admin)
 */
const getAllUsers = asyncHandler(
  async (req,res) => {
    const users = await User.find().select("-password")
    res.status(200).json(users)
  }
)

/**
 * @desc    Get user by id
 * @route   /api/users/:id
 * @method  Get
 * @access  private (only admin $ user himself)
 */
const getUserById = asyncHandler(
  async (req,res) => {
    const user= await User.findById(req.params.id).select("-password")
    if(user){
      res.status(200).json(user)
    } else {
      res.status(404).json({
        message: "user not found"
      })
    }
  }
)

/**
 * @desc    Delete user
 * @route   /api/users/:id
 * @method  delete
 * @access  private (only admin and user himself)
 */
const deleteUser = async (req,res) => {
  try {
    await User.findByIdAndDelete(req.params.id).select("-password")
  } catch (error) {
    res.status(404).json({
      message: "user not found"
    })
  }
}

module.exports = {
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser
}