/*
    // Custome Module
    const logger = require('./logger')
    //const { sayHello } = require('./logger')
    // sayHello()
    logger.sayHello()

    // Third Party Module
    const exoress = require('express')
*/
//Core Module
const http = require('http')

const books = [
  {
    id: 1,
    name: 'book 1'
  },
  {
    id: 2,
    name: 'book 2'
  },
  {
    id: 3,
    name: 'book 3'
  }
]

// create a server
const server = http.createServer((req,res) => {
  if(req.url === '/'){
    res.write('<h1>Welcome to NODE JS<h1>')
    res.end() 
  }
  if(req.url === '/api/books'){
    res.write(JSON.stringify(books))
    res.end()
  }
})

server.listen(3000, () => {
    console.log('Server is running on port 3000')
})