const express = require('express')
const booksPath = require('./routes/books')
const authorsPath = require('./routes/authors')
//connect between express and mongodb
const mongoose = require('mongoose')
const logger = require('./middlewars/logger')
const { notFound, errorHandler } = require('./middlewars/errors')
const dotenv = require('dotenv')
dotenv.config()

//connection to DataBase
//and this is a promise so it return error or success
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch((error) => console.log('Connection failed to MongoDB', error))

// init app
const app = express()

// a middlewares fun to to read the json file
app.use(express.json()) 

app.use(logger)

//Routes
app.use('/api/books', booksPath)
app.use('/api/authors', authorsPath)

// Error handler middleware
app.use(notFound)
app.use(errorHandler)

// running the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})