const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const {Author,validateCreateAuthor,validateUpdateAuthor} = require('../models/Author')

/**
 * @desc    Get all authors
 * @route   /api/authors
 * @method  Get
 * @access  public
 */
// router.get('/', async (req,res) => {
//     try {
//         const authorList = await Author.find() //.sort({firstName: 1}).select("firstName lastName -_id")// to sort the data from a to z
//         res.status(200).json(authorList)
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({message: "somthing went wrong"})
//     }
// })
// with asyncHandler
router.get('/', asyncHandler(
    async (req,res) => {
        const authorList = await Author.find() //.sort({firstName: 1}).select("firstName lastName -_id")// to sort the data from a to z
        res.status(200).json(authorList)
    }
))



/**
 * @desc    Get author by id
 * @route   /api/authors/:id
 * @method  Get
 * @access  public
 */
// router.get('/:id', async (req,res) => {
//     try {
//         const author = await Author.findById(req.params.id)
//         res.status(200).send(`Author's name is: ${author.firstName} ${author.lastName}`)
//     } catch(error){
//         console.log(error)
//         res.status(500).send('Author not found')
//     }
// })
//with asyncHandler
router.get('/:id', asyncHandler(
    async (req,res) => {
        const author = await Author.findById(req.params.id)
        res.status(200).send(`Author's name is: ${author.firstName} ${author.lastName}`)
    }
))

/**
 * @desc    Create new author
 * @route   /api/authors
 * @method  Post
 * @access  public
 */
// router.post('/', async (req,res) => {
    
//     const { error } = validateCreateAuthor(req.body)

//     if(error) {
//         return res.status(400).json(error.details[0].message)
//     }

//     try {
//         const author = new Author({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName
//         })
    
//         const result = await author.save()
    
//         res.status(201).json(result) // 201 => created successfuly
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: 'Something went wrong '})
//     }
// })
//with asyncHandler
router.post('/', asyncHandler(
    async (req,res) => {
    
    const { error } = validateCreateAuthor(req.body)

    if(error) {
        return res.status(400).json(error.details[0].message)
    }

    const author = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    const result = await author.save()

    res.status(201).json(result) // 201 => created successfuly
}
))

/**
 * @desc    Update new author
 * @route   /api/authors/:id
 * @method  Put
 * @access  public
 */
// router.put('/:id', async (req,res) => {
    
//     const { error } = validateUpdateAuthor(req.body)

//     if(error) {
//         return res.status(400).json(error.details[0].message)
//     }

//     try {
//         const author = await Author.findByIdAndUpdate(
//             req.params.id, 
//             {
//                 $set: {
//                     firstName: req.body.firstName,
//                     lastName: req.body.lastName
//                 }
//             }, 
//             {
//                 new: true
//             }
//         )
//         res.status(200).json(author)
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: 'Something went wrong '})
//     }
// })
//with asyncHandler
router.put('/:id', asyncHandler( 
    async (req,res) => {
    
    const { error } = validateUpdateAuthor(req.body)

    if(error) {
        return res.status(400).json(error.details[0].message)
    }

    const author = await Author.findByIdAndUpdate(
        req.params.id, 
        {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
        }, 
        {
            new: true
        }
    )
    res.status(200).json(author)
}
))
/**
 * @desc delete a author
 * @route /ipi/author/:id
 * @method Delete
 * @access public
 */
// router.delete('/:id', async (req,res) => {
//     try {
//         const author = await Author.findById(req.params.id)
//         await Author.findByIdAndDelete(author)
//         res.status(200).json({message: 'author has been deleted'})
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: 'Something went wrong '})
//     }
// })
//with asynchandler
router.delete('/:id', asyncHandler( 
    async (req,res) => {
    const author = await Author.findById(req.params.id)
    await Author.findByIdAndDelete(author)
    res.status(200).json({message: 'author has been deleted'})
}
))

module.exports = router