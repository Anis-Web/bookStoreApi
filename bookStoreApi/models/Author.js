const mongoose = require('mongoose')

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
    }
}, {
    timestamps: true
})

const Author = mongoose.model("Author", AuthorSchema)

module.exports = {
    Author
}