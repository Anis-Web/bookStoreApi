const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const { 
  User, 
  validateUpdateUser, 
} = require("../models/User")
const { verifyTokenAndAdmin, verifyTokenAndAuthoization } = require("../middlewars/verifyToken")

/**
 * @desc    UpdateUser
 * @route   /api/users/:id
 * @method  Put
 * @access  private
 */
router.put(
  "/:id",
  verifyTokenAndAuthoization,
  asyncHandler(
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
)

/**
 * @desc    Get all users
 * @route   /api/users
 * @method  Get
 * @access  private (only admin)
 */
router.get(
  "/",
  verifyTokenAndAdmin,
  asyncHandler(
    async (req,res) => {
      const users = await User.find().select("-password")
      res.status(200).json(users)
    }
  )
)

module.exports = router