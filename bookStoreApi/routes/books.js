const express = require('express')
const router = express.Router()
// const asyncHandler = require('express-async-handler')
const {Book,validateCreateBook,validateUpdateBook} = require('../models/Book')

// http methods/verbs
// app.get(route, callbackfun)
// app.post()
// app.put()
// app.delete()
// app.listen(port, callbackfun)

// router.get('/', (req, res) => {
//     res.send('Hello, Welcome to express js')
// })

//write a doc
/**
 * @desc    Get all books
 * @route   /api/books
 * @method  Get
 * @access  public
 */
router.get('/',
    async (req,res) => {
        try {
            const books = await Book.find().populate("author", ["firstName","lastName"])
            res.status(200).json(books)
        } catch (error) {
            console.log(error)
            res.status(500).send('somthing went wrong')
        }
    }
)
/**
 * @desc    Get book by id
 * @route   /api/books/:id
 * @method  Get
 * @access  public
 */
router.get('/:id',
    async (req,res) => {
    try {
        const book = await Book.findById(req.params.id).populate("author", ["firstName","lastName"])
        res.status(200).json(book) 
    } catch (error) {
        console.log(error)
        res.status(404).send('book not found')
    }
    }
)

/**
 * @desc    Create new book
 * @route   /api/books
 * @method  Post
 * @access  public
 */
router.post('/', async (req,res) => { 
    // result    result.error
    const { error } = validateCreateBook(req.body)
    if(error) {
        return res.status(400).json(error.details[0].message)
    }

    try {
        const book = new Book({
            title: req.body.title,
            author: req.body.author
        })
        const result = await book.save()
        res.status(201).json(result) // 201 => created successfuly
    } catch (reason) {
        console.log(reason)
        res.status(500).send('Something went wrong')
    }
})
/**
 * @desc update a book
 * @route /ipi/books/:id
 * @method Put
 * @access public
 */
router.put('/:id', 
    async (req,res) => {
    const { error } = validateUpdateBook(req.body)
    if(error) {
        return res.status(400).json({message: error.details[0].message})
    }

    try {
        const updateBook = await Book.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    title: req.body.title,
                    author: req.body.author
                }
            },
            {
                new: true
            }
        )
        res.status(200).json(updateBook)
    } catch (error) {
        console.log(error)
        res.status(500).send('book not found')
    }
})
/**
 * @desc delete a book
 * @route /ipi/books/:id
 * @method Delete
 * @access public
 */
router.delete('/:id', 
    async (req,res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id)
        res.status(200).send('book has been deleted')
    } catch (error) {
        res.status(500).send('book not found')
    }
})

module.exports = router