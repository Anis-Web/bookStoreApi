const express = require('express')
const router = express.Router()
//labery to validate the api
const joi = require('joi')

// http methods/verbs
// app.get(route, callbackfun)
// app.post()
// app.put()
// app.delete()
// app.listen(port, callbackfun)

const books = [
    {
        id: 1,
        name: 'book 1',
        author: 'author 1'
    },
    {
        id: 2,
        name: 'book 2',
        author: 'author 2'
    },
    {
        id: 3,
        name: 'book 3',
        author: 'author 3'
    },
    {
        id: 4,
        name: 'book 4',
        author: 'author 4'
    },
]

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
router.get('/', (req,res) => {
    res.status(200).json(books)
})

/**
 * @desc    Get book by id
 * @route   /api/books/:id
 * @method  Get
 * @access  public
 */
router.get('/:id', (req,res) => {
    const book = books.find(b => b.id === Number(req.params.id))
    book ? 
        res.status(200).json(book) 
        : 
        res.status(404).json({message: 'book not found'})
})

/**
 * @desc    Create new book
 * @route   /api/books
 * @method  Post
 * @access  public
 */
router.post('/', (req,res) => {
    
    const { error } = validateCreateBook(req.body)

    if(error) {
        return res.status(400).json(error.details[0].message)
    }

    const book = {
        id: books.length + 1,
        name: req.body.name,
        author: req.body.author
    }
    books.push(book)
    res.status(201).json(book) // 201 => created successfuly
})

/**
 * @desc update a book
 * @route /ipi/books/:id
 * @method Put
 * @access public
 */
router.put('/:id', (req,res) => {
    const { error } = validateUpdateBook(req.body)
    if(error) {
        return res.status(400).json({message: error.details[0].message})
    }

    const book = books.find(b => b.id === Number(req.params.id))
    if(book) {
        res.status(200).json({message: 'book has been updated'})
    } else{
        res.status(404).json({message: 'book not found'})
    }
})

/**
 * @desc delete a book
 * @route /ipi/books/:id
 * @method Delete
 * @access public
 */
router.delete('/:id', (req,res) => {
    const book = books.find(b => b.id === Number(req.params.id))
    if(book) {
        res.status(200).json({message: 'book has been deleted'})
    } else{
        res.status(404).json({message: 'book not found'})
    }
})

// Validate Create Book
function validateCreateBook(obj) {
    // if(!req.body.name) { 
    //     return res.status(400).json('title is required')
    // }
    const schema = joi.object({
        name: joi.string().trim().min(3).max(30).required(),
        author: joi.string().trim()
    })

    return schema.validate(obj)
}

// Validate Update Book
function validateUpdateBook(obj) {
    const schema = joi.object({
        name: joi.string().trim().min(3).max(30),
        author: joi.string().trim()
    })

    return schema.validate(obj)
}

module.exports = router