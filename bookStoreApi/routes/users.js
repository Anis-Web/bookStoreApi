const express = require('express')
const router = express.Router()
const { 
  verifyTokenAndAdmin, 
  verifyTokenAndAuthoization 
} = require("../middlewars/verifyToken")
const { 
  updateUser, 
  getAllUsers, 
  getUserById, 
  deleteUser
} = require('../controllers/usersController')



router.route('/:id')
  .put(verifyTokenAndAuthoization,updateUser)
  .get(verifyTokenAndAuthoization,getUserById)
  .delete(verifyTokenAndAuthoization,deleteUser)

router.get("/",verifyTokenAndAdmin,getAllUsers)

module.exports = router