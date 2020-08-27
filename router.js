const express = require('express');
const router = express.Router();
const { Book } = require('./models')
const { Op } = require("sequelize");

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
router.post('/books/new', async (req, res) => {  
        const newBook = await Book.create({ title: req.body.title, author: req.body.author, genre: req.body.genre, year: req.body.year })
        res.redirect(`/books/${newBook.id}`) 
})
//shows the book detail form
router.get('/books/:id', (req, res) => {
        Book.findByPk(req.params.id).then(book => {
            res.render('update-book', { book })
        }) 
})
//updates the book info
router.post('/books/:id', async(req, res) => {
    await Book.update({ title: req.body.title, author: req.body.author, genre: req.body.genre, year: req.body.year}, {
        where: {
            id: req.params.id
        }
    })
    res.redirect(`/books/${req.params.id}`)
})
//deletes a book
router.post('/books/:id/delete', async(req, res) => {
    await Book.destroy({
        where: {
            id: req.params.id
        }
    });
    res.redirect('/');
})


module.exports = router