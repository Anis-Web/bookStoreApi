const express = require('express')
const booksPath = require('./routes/books')
const authorsPath = require('./routes/authors')
//connect between express and mongodb
const mongoose = require('mongoose')

//connection to DataBase
//and this is a promise so it return error or success
mongoose
    .connect('mongodb://localhost/bookStoreDB')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((error) => console.log('Connection failed to MongoDB', error))

// init app
const app = express()

// a middlewares fun to to read the json file
app.use(express.json()) 

//Routes
app.use('/api/books', booksPath)
app.use('/api/authors', authorsPath)

// running the server
const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})