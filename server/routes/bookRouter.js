const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware')

router.get('/', (req, res) => {
    res.render('books/index');
});

router.get('/add', authMiddleware, (req, res) => {
    res.render('books/add', { layout: 'layouts/formPageLayout', errorISBN: '', errorTitle: '', });
});

router.post('/add', authMiddleware, (req, res) => {
    res.send('Book Added');
});

router.get('/add-by-isbn', authMiddleware, (req, res) => {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + req.query['addBookISBN'] + '&printType=books';
    fetch(url, {
        method: 'GET',
    })
        .then(resp => resp.json())
        .then(data => {
            if (data.totalItems > 0) {
                bookListData = {
                    totalBooks: data.totalItems,
                    bookData: [],
                };
                for (let book in data.items) {
                    const bookInfo = book.volumeInfo;
                    const params = {
                        title: bookInfo.title,
                        author: bookInfo.authors,
                        publisher: bookInfo.publisher,
                        publishedDate: bookInfo.publishedDate,
                        description: bookInfo.description,
                        thumbnailLink: bookInfo.imageLinks.thumbnail,
                    };
                    bookListData.bookData.push(params);
                }
                res.render('books/add-by-search', { layout: 'layouts/interiorPageLayout', bookList: bookListData });
            } else {
                res.render('books/add', { layout: 'layouts/formPageLayout', errorISBN: 'No Books Found', errorTitle: '', });
            }
        })
        .catch(error => console.log(error));
});

router.get('/add-by-title', authMiddleware, (req, res) => {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=intitle:"' + req.query['addBookTitle'] + '"inauthor:"' + req.query['addBookAuthor'] + '"&printType=books';
    fetch(url, {
        method: 'GET',
    })
        .then(resp => resp.json())
        .then(data => {
            if (data.totalItems > 0) {
                bookListData = {
                    totalBooks: data.totalItems,
                    bookData: [],
                };
                for (let bookIndex in data.items) {
                    const bookInfo = data.items[bookIndex].volumeInfo;
                    const params = {
                        title: bookInfo.title,
                        authors: bookInfo.authors,
                        publisher: bookInfo.publisher,
                        publishedDate: bookInfo.publishedDate,
                        description: bookInfo.description,
                        thumbnailLink: (bookInfo.imageLinks?bookInfo.imageLinks.thumbnail:''),
                    };
                    bookListData.bookData.push(params);
                }
                res.render('books/add-by-search', { layout: 'layouts/interiorPageLayout', bookList: bookListData, });
            } else {
                res.render('books/add', { layout: 'layouts/formPageLayout', errorISBN: '', errorTitle: 'No Books Found', });
            }
        })
        .catch(error => console.log(error));
});

router.get('/search', (req, res) => {
    res.send('Book Search');
});

module.exports = router;
