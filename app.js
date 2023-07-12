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
/*
HTTP
  *Http => Hyper Text Transfer Protocol
  *Communication between a web server(exp: express js api) and web browser (client)(exp: postmen)
  *HTTP Request & HTTP Response => the server takes the request from the client and save the data in the database
  and res is the answer from the server to the client 
  and they(req,res) includes {headers, body} in the header the inf about the req and in the body the data
Methods
  CRUD operation
  Post: creating new object
  Get: Reading data from server
  Put: Updating an object
  Delete: Deleting an object
*/
