const express = require('express')
const router = express.Router()
const { verifyTokenAndAdmin } = require("../middlewars/verifyToken")
const { 
  getAllBooks, 
  getBookById, 
  createNewBook, 
  upadateBook, 
  deleteBook 
} = require('../controllers/booksController')

// /api/books
router.route('/')
  .get(getAllBooks)
  .post(verifyTokenAndAdmin, createNewBook)

// /api/books/id
router.route('/:id')
  .get(getBookById)
  .put(verifyTokenAndAdmin,upadateBook)
  .delete(verifyTokenAndAdmin,deleteBook)

module.exports = router