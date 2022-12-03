const mongoose = require('mongose');

const bookSchema = new mongoose.Schema({
    isbn: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    source_users: {
        type: [String],
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
    },
    thumbnailLink: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Book', bookSchema);
