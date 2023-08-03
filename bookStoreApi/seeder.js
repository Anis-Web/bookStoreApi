const { Book } = require('./models/Book')
const { Author } = require('./models/Author')
const { books,authors } = require('./data')
const connectToDb = require('./config/db')
require('dotenv').config()

//Connection to DB
connectToDb()

// Import books
const importBooks = async () => {
  try {
    //insert all the array of books in books collection
    await Book.insertMany(books)
    console.log('Books Imported')
  } catch (error) {
    console.log(error)
    // cut the connection to the DB
    process.exit(1)
  }
}
// Import authors
const importAuthors = async () => {
  try {
    await Author.insertMany(authors)
    console.log('Authors Imported')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

// remove books
const removeBooks = async () => {
  try {
    //remove all the books in books collection
    await Book.deleteMany()
    console.log('Books Removed')
  } catch (error) {
    console.log(error)
    // cut the connection to the DB
    process.exit(1)
  }
}
// remove authors
const removeAuthors = async () => {
  try {
    await Author.deleteMany()
    console.log('Authors Removed')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

//argv array => node seeder -import/-remove
//                          index 2
if(process.argv[2] === '-import-books') {
  importBooks()
} else if(process.argv[2] === '-remove-books') {
  removeBooks()
} else if (process.argv[2] === '-import-authors') {
  importAuthors()
} else if(process.argv[2] === '-remove-authors') {
  removeAuthors()
}
