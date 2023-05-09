const express = require('express');
const router = express.Router();

const BookModel = require('../models/book');
const UserModel = require('../models/user');

router.get('/', async (req, res) => {
    const userID = res.locals.user.id;
    const user = await UserModel.findById(userID);
    const books = await BookModel.find().where('_id').in(user.books).exec();
    let bookListData = {
        totalBooks: books.totalItems,
        bookData: [],
    };
    for (let bookIndex in books) {
        const bookInfo = books[bookIndex].bookDetails;
        const params = {
            title: bookInfo.title,
            authors: bookInfo.authors,
            publisher: bookInfo.publisher,
            publishedDate: bookInfo.publishedDate,
            thumbnailLink: bookInfo.thumbnailLink,
            indentifier: bookInfo._id,
        };
        bookListData.bookData.push(params);
    }
    console.log(user);
    res.render('profile/my-profile', { layout: 'layouts/interiorPageLayout', bookList: bookListData, userData: user.toJSON() });
});

module.exports = router;
