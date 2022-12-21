const mongoose = require('mongoose');

const bookDetailSchema = new mongoose.Schema({
    isbn: {
        type: String,
        required: false,
    },
    thumbnailLink: {
        type: String,
        required: false,
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
        required: false,
    },
    publishedDate: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
});

const bookSchema = new mongoose.Schema({
    source_users: {
        type: [String],
        required: true,
    },
    bookDetails: {
        type: bookDetailSchema,
        required: true,
    }
});

module.exports = mongoose.model('Book', bookSchema);
