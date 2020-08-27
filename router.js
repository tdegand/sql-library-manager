const express = require('express');
const router = express.Router();
const { Book } = require('./models')

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
        if(req.body.title === null || req.body.author === null || req.body.genre === null || req.body.year === null) {
            const error = new Error(`${req.body.title} ${req.body.author} ${req.body.genre} ${req.body.year} cannot be empty`)
            res.render('new-book', { error })
        } else {
            const newBook = await Book.create({ title: req.body.title, author: req.body.author, genre: req.body.genre, year: req.body.year })
            res.redirect(`/books`) 
        }     
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
    res.redirect(`/books`)
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

router.get('*', (req, res, next) => {
    const error = new Error("This page cannot be found")
    error.status = 404
    next(error)
})


module.exports = router