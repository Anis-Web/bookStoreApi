const express = require('express')
const router = express.Router()
const { verifyTokenAndAdmin } = require("../middlewars/verifyToken")
const { modelNames } = require('mongoose')
const { 
    getAuthors, 
    getAuthorById, 
    createNewAuthor, 
    updateAuthor, 
    deleteAuthor 
} 
= require('../controllers/authorsController')

router.route('/')
    .get(getAuthors)
    .post(verifyTokenAndAdmin, createNewAuthor)

router.route('/:id')
    .get(getAuthorById)
    .put(verifyTokenAndAdmin, updateAuthor)
    .delete(verifyTokenAndAdmin, deleteAuthor)

module.exports = router