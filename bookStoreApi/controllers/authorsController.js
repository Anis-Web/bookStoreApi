const asyncHandler = require('express-async-handler')
const {
    Author,
    validateCreateAuthor,
    validateUpdateAuthor
} = require('../models/Author')

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

const getAuthors = asyncHandler(
  async (req,res) => {
      //pagination(the number of page when we have more than one)
      const { pageNumber } = req.query
      let authorList
      if(!pageNumber || pageNumber > ((await Author.find()).length)){
          authorList = await Author.find()
      } else if(pageNumber) {
          authorList = await Author.find().select('firstName lastName nationality')
          .skip(pageNumber - 1).limit(1) 
          //.sort({firstName: 1}).select("firstName lastName -_id")// to sort the data from a to z
      } 
      res.status(200).json(authorList)
      console.log(typeof((await Author.find()).length))
  }
)

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
const getAuthorById = asyncHandler(
  async (req,res) => {
      const author = await Author.findById(req.params.id)
      res.status(200).json(author)
  }
)

/**
 * @desc    Create new author
 * @route   /api/authors
 * @method  Post
 * @access  private (only admin)
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
const createNewAuthor = asyncHandler(
  async (req,res) => {
  
  const { error } = validateCreateAuthor(req.body)

  if(error) {
      return res.status(400).json(error.details[0].message)
  }

  const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality
  })

  const result = await author.save()

  res.status(201).json(result) // 201 => created successfuly
}
)

/**
 * @desc    Update author
 * @route   /api/authors/:id
 * @method  Put
 * @access  private (only admin)
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
const updateAuthor = asyncHandler( 
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
              lastName: req.body.lastName,
              nationality: req.body.nationality
          }
      }, 
      {
          new: true
      }
  )
  res.status(200).json(author)
}
)

/**
 * @desc delete a author
 * @route /ipi/author/:id
 * @method Delete
 * @access private (only admin)
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
const deleteAuthor = asyncHandler( 
  async (req,res) => {
  const author = await Author.findById(req.params.id)
  await Author.findByIdAndDelete(author)
  res.status(200).json({message: 'author has been deleted'})
}
)

module.exports = {
  getAuthors,
  getAuthorById,
  createNewAuthor,
  updateAuthor,
  deleteAuthor,

}