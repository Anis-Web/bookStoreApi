const mongoose = require('mongoose')
const joi = require('joi')

const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlenght: 2,
        maxlength: 200,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlenght: 2,
        maxlength: 200,
    },
    nationality: {
        type: String,
        trim: true,
        minlenght: 2,
        maxlength: 200,
    }
}, {
    timestamps: true
})

const Author = mongoose.model("Author", AuthorSchema)

//Create
function validateCreateAuthor(obj) {
    const schema = joi.object({
        id: joi.number(),
        firstName: joi.string().trim().min(2).required(),
        lastName: joi.string().trim().min(2).required(),
        nationality: joi.string().trim().min(2).max(200)
    })

    return schema.validate(obj)
}

//Update
function validateUpdateAuthor(obj) {
    const schema = joi.object({
        id: joi.number(),
        firstName: joi.string().trim().min(2).required(),
        lastName: joi.string().trim().min(2).required(),
        nationality: joi.string().trim().min(2).max(200)
    })

    return schema.validate(obj)
}



module.exports = {
    Author,
    validateCreateAuthor,
    validateUpdateAuthor
}