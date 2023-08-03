const express = require('express')
const { getFrogotPasswordView, sendFrogotPasswordLink, getResetPasswordView, getThePassword, resetThePassword } = require('../controllers/passwordController')
const router = express.Router()


// /password/forgot-password
router.route('/forgot-password')
  .get(getFrogotPasswordView)
  .post(sendFrogotPasswordLink)

// /paasword/reset-password/:userId/:token
router.route('/reset-password/:userId/:token')
  .get(getResetPasswordView)
  .post(resetThePassword)

module.exports = router