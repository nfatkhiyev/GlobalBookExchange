const mongoose = require('mongose');

const bookSchema = new mongoose.Schema({
    isbn: {
        type: Number,
        required: true,
    },
    serializer: {
        type: String,
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
        type: Array,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
    },
    thumbnail_hash: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Book', bookSchema);
