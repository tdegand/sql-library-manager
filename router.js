const express = require('express');
const router = express.Router();

//index page redirects to all books
router.get('/', (req, res) => {
    res.redirect('/books');
})
//All books
router.get('/books', (req, res, next) => {
        res.render('index')  
})
//new book form route
router.get('/books/new', (req, res) => {
    res.render('new-book')
})
//posts the new book to the database
router.post('/books/new', (req, res) => {
    res.render('new-book')
})
//shows the book detail form
router.get('/books/:id', (req, res) => {
    res.render('update-book')
})
//updates the book info
router.post('/books/:id', (req, res) => {
    res.render('update-book')
})
//deletes a book
router.post('/books/:id/delete', (req, res) => {
    res.render('new-book')
})

module.exports = router