const express = require('express');
const router = express.Router();
const { Book } = require('./models')
const Sequelize = require("sequelize");
const { Op, where } = require("sequelize");

//index page redirects to all books
router.get('/', (req, res) => {
    res.redirect('/books');
})
//All books
router.get('/books', (req, res, next) => {
        Book.findAll().then(books => {
            res.render('index', { books })  
        })      
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
        Book.findByPk(req.params.id).then(book => {
            res.render('update-book', { book })
        }) 
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