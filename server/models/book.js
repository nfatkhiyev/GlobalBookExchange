const mongoose = require('mongoose');

const bookDetailSchema = new mongoose.Schema({
    isbn: {
        type: String,
        required: true,
    },
    thumbnailLink: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    authors: {
        type: [String],
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    publishedDate: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
},
{
    _id:false,
});

const bookSchema = new mongoose.Schema({
    sourceUsers: {
        type: [String],
        required: true,
    },
    bookDetails: {
        type: bookDetailSchema,
        required: true,
    }
});

module.exports = mongoose.model('Book', bookSchema);
