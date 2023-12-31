const {
  Book,
  validateCreateBook,
  validateUpdateBook
} = require('../models/Book')

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
const getAllBooks = async (req,res) => {
  try {
      // Comparioson Query Operators
      // $eq => equal for exp  Book.find({price: {$eq: 10}})
      // $nq => not equal
      // $lt => less than
      // $lte => less than or equal
      // $gt => grater than
      // $gte => grater than or equal
      // $in => for exp Book.find({price: {$in: [8,9]}}) => price == 8 || price == 9
      // $nin => !$in
      const { minPrice,maxPrice } = req.query

      let books
      if(minPrice && maxPrice){
          books = await Book.find({price: {$gte: minPrice, $lte:maxPrice}})
          .populate("author", ["firstName","lastName"])
      } else if(!minPrice && maxPrice) {
          books = await Book.find({price: {$lte:maxPrice}})
          .populate("author", ["firstName","lastName"])
      } else if(minPrice && !maxPrice) {
          books = await Book.find({price: {$gte: minPrice}})
          .populate("author", ["firstName","lastName"])
      } else{
          books = await Book.find()
          .populate("author", ["firstName","lastName"])
      }
      res.status(200).json(books)

  } catch (error) {
      console.log(error)
      res.status(500).send('somthing went wrong')
  }
}

/**
 * @desc    Get book by id
 * @route   /api/books/:id
 * @method  Get
 * @access  public
 */
const getBookById = async (req,res) => {
  try {
      const book = await Book.findById(req.params.id).populate("author", ["firstName","lastName"])
      res.status(200).json(book) 
  } catch (error) {
      console.log(error)
      res.status(404).send('book not found')
  }
}

/**
 * @desc    Create new book
 * @route   /api/books
 * @method  Post
 * @access  private (only admin)
 */
const createNewBook = async (req,res) => { 
  // result    result.error
  const { error } = validateCreateBook(req.body)
  if(error) {
      return res.status(400).json(error.details[0].message)
  }

  try {
      const book = new Book({
          title: req.body.title,
          author: req.body.author,
          description: req.body.description,
          price: req.body.price
      })
      const result = await book.save()
      res.status(201).json(result) // 201 => created successfuly
  } catch (reason) {
      console.log(reason)
      res.status(500).send('Something went wrong')
  }
}

/**
 * @desc update a book
 * @route /ipi/books/:id
 * @method Put
 * @access private (only admin)
 */
const upadateBook = async (req,res) => {
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
          author: req.body.author,
          description: req.body.description,
          price: req.body.price
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
}

/**
 * @desc delete a book
 * @route /ipi/books/:id
 * @method Delete
 * @access private (only admin)
 */
const deleteBook =  async (req,res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)
    res.status(200).send('book has been deleted')
  } catch (error) {
    res.status(500).send('book not found')
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createNewBook,
  upadateBook,
  deleteBook
}