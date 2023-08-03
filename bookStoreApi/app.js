const express = require('express')
//connect between express and mongodb
const connectToDb = require('./config/db')
const logger = require('./middlewars/logger')
const { notFound, errorHandler } = require('./middlewars/errors')
require('dotenv').config()


//connection to DataBase
//and this is a promise so it return error or success
connectToDb()
// init app
const app = express()

// a middlewares fun to to read the json file
app.use(express.json()) 
// to read the url
app.use(express.urlencoded({extended:false}))
app.use(logger)

//Routes
app.use('/api/books', require('./routes/books'))
app.use('/api/authors', require('./routes/authors'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
app.use('/password', require('./routes/password'))

// Error handler middleware
app.use(notFound)
app.use(errorHandler)

//set the view engine ejs/pug
app.set('view engine', 'ejs')

// running the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})