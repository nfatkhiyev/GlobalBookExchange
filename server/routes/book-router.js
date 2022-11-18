const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('books/index');
});

router.post('/add', (req, res) => {
    res.send('Book Added');
});

router.get('/find-by-isbn', (req, res) => {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + req.query['isbn'];
    const request = new Request(url, {
        method: 'GET',
    });
    fetch(url, {
        method: 'GET',
    })
        .then(resp => resp.json())
        .then(data => {
            if(data.totalItems > 0){
                const bookInfo = data.items[0].volumeInfo;
                res.send(bookInfo.title + bookInfo.description);
            }
            else{
                res.send('No Books Found.');
            }
        })
        .catch(error => console.log(error));
});

router.get('/search', (req, res) => {
    res.send('Book Search');
});

module.exports = router;
