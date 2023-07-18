const express = require('express')
const router = express.Router()
const joi = require('joi')
const { Author } = require('../models/Author')

const authors = [
    {
        id: 1,
        firstName: 'name 1',
        lastName: 'name 1',
    },
    {
        id: 2,
        firstName: 'name 2',
        lastName: 'name 2',
    },
    {
        id: 3,
        firstName: 'name 3',
        lastName: 'name 3',
    },
    {
        id: 4,
        firstName: 'name 4',
        lastName: 'name 4',
    }
]

/**
 * @desc    Get all authors
 * @route   /api/authors
 * @method  Get
 * @access  public
 */
router.get('/', (req,res) => {
    res.status(200).json(authors)
})

/**
 * @desc    Get author by id
 * @route   /api/authors/:id
 * @method  Get
 * @access  public
 */
router.get('/:id', (req,res) => {
    const author = authors.find(a => a.id === Number(req.params.id))
    if(author){
        return res.status(200).send(`Author's name is: ${author.firstName} ${author.lastName}`)
    } else{
        res.status(404).send('Author not defined')
    }
})

/**
 * @desc    Create new author
 * @route   /api/authors
 * @method  Post
 * @access  public
 */
router.post('/', async (req,res) => {
    
    const { error } = validateCreateAuthor(req.body)

    if(error) {
        return res.status(400).json(error.details[0].message)
    }

    try {
        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
    
        const result = await author.save()
    
        res.status(201).json(result) // 201 => created successfuly
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong '})
    }
})

/**
 * @desc    Update new author
 * @route   /api/authors/:id
 * @method  Put
 * @access  public
 */
router.put('/:id', (req,res) => {
    
    const { error } = validateUpdateAuthor(req.body)

    if(error) {
        return res.status(400).json(error.details[0].message)
    }

    const author = authors.find(a => a.id === Number(req.params.id))
    if(author) {
        res.status(200).json({message: 'author has been updated'})
    } else{
        res.status(404).json({message: 'author not found'})
    }
})

/**
 * @desc delete a author
 * @route /ipi/author/:id
 * @method Delete
 * @access public
 */
router.delete('/:id', (req,res) => {
    const author = authors.find(b => b.id === Number(req.params.id))
    if(author) {
        res.status(200).json({message: 'author has been deleted'})
    } else{
        res.status(404).json({message: 'author not found'})
    }
})

//Create
function validateCreateAuthor(obj) {
    const schema = joi.object({
        id: joi.number(),
        firstName: joi.string().trim().min(2).required(),
        lastName: joi.string().trim().min(2).required()
    })

    return schema.validate(obj)
}

//Update
function validateUpdateAuthor(obj) {
    const schema = joi.object({
        id: joi.number(),
        firstName: joi.string().trim().min(2).required(),
        lastName: joi.string().trim().min(2).required()
    })

    return schema.validate(obj)
}

module.exports = router