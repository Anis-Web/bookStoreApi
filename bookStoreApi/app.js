const express = require('express')
//labery to validate the api
const joi = require('joi')
// init app
const app = express()
// a middlewares fun to to read the json file
app.use(express.json()) 
// http methods/verbs
// app.get(route, callbackfun)
// app.post()
// app.put()
// app.delete()
// app.listen(port, callbackfun)

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
    },
    {
        id: 4,
        name: 'book 4'
    },
]

app.get('/', (req, res) => {
    res.send('Hello, Welcome to express js')
})

app.get('/api/books', (req,res) => {
    res.status(200).json(books)
})
app.get('/api/books/:id', (req,res) => {
    const book = books.find(b => b.id === Number(req.params.id))
    book ? 
        res.status(200).json(book.name) 
        : 
        res.status(404).json({message: 'book not found'})
})

app.post('/api/books', (req,res) => {
    // if(!req.body.name) { 
    //     return res.status(400).json('title is required')
    // }
    const schema = joi.object({
        name: joi.string().trim().min(3).max(30).required()
    })

    const { error } = schema.validate(req.body)

    if(error) {
        return res.status(400).json(error.details[0].message)
    }

    const book = {
        id: books.length,
        name: req.body.name
    }
    books.push(book)
    res.status(201).json(book) // 201 => created successfuly
})

// running the server
const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})