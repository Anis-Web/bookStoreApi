const mongoose = require('mongoose')
//Labery to validate book
const joi = require('joi')

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlenght: 2,
        maxlength: 200,
    },
    author: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Author",
    },
    description: {
        type: String,
        trim: true,
        minlenght: 2,
        maxlength: 200,
    },
    price: {
        type: Number,
    }
}, {
    timestamps: true
})

const Book = mongoose.model("Book", BookSchema)

// Validate Create Book
function validateCreateBook(obj) {
    // if(!req.body.name) { 
    //     return res.status(400).json('title is required')
    // }
    const schema = joi.object({
        title: joi.string().trim().min(3).max(30).required(),
        author: joi.string().required(),
        description: joi.string().min(2).max(200),
        price: join.number()
    })

    return schema.validate(obj)
}

// Validate Update Book
function validateUpdateBook(obj) {
    const schema = joi.object({
        title: joi.string().trim().min(3).max(30),
        author: joi.string().required(),
        description: joi.string().min(2).max(200),
        price: join.number()
    })

    return schema.validate(obj)
}

module.exports = {
    Book,
    validateCreateBook,
    validateUpdateBook
}
