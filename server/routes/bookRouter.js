const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware')

router.get('/', (req, res) => {
    res.render('books/index');
});

router.post('/add', authMiddleware, (req, res) => {
    res.send('Book Added');
});

router.get('/find-by-isbn', authMiddleware, (req, res) => {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + req.query['isbn'];
    fetch(url, {
        method: 'GET',
    })
        .then(resp => resp.json())
        .then(data => {
            if(data.totalItems > 0){
                const bookInfo = data.items[0].volumeInfo;
                const params = {
                    title: bookInfo.title,
                    author: bookInfo.author,
                    publisher: bookInfo.publisher,
                    publishedDate: bookInfo.publishedDate,
                    description: bookInfo.description,
                    thumbnailLink: bookInfo.imageLinks.thumbnail,
                };
                res.json(params);
            } else {
                res.send('No Books Found.');
            }
        })
        .catch(error => console.log(error));
});

router.get('/search', (req, res) => {
    res.send('Book Search');
});

module.exports = router;
