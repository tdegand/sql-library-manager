const express = require('express');
const router = express.Router();
const { Book } = require('./models');

/* Handler function to wrap each route. */
function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
        res.status(500).send(error);
      }
    }
  }

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
router.post('/books/new', asyncHandler(async (req, res) => { 
        try {
            //takes user input and pushes it to the DB
            await Book.create({ title: req.body.title, author: req.body.author, genre: req.body.genre, year: req.body.year })
            res.redirect(`/books`) 
        } catch(error) {
            //displays error messages form validator error produced by sequelize
            if (error.name === "SequelizeValidationError") {
                res.render('new-book', { errors: error.errors })
            }
        }    
}));
//shows the book detail form
router.get('/books/:id', (req, res) => {
        Book.findByPk(req.params.id).then(book => {
            res.render('update-book', { book })
        }) 
})
//updates the book info
router.post('/books/:id', async(req, res) => {
    try {
        //takes user input and pushes it to the DB for updates
        await Book.update({ title: req.body.title, author: req.body.author, genre: req.body.genre, year: req.body.year}, {
            where: {
                id: req.params.id
            }
        })
        res.redirect('/')
    } catch(error) {
        if (error.name === "SequelizeValidationError") {
            //displays error messages form validator error produced by sequelize
            await Book.findByPk(req.params.id).then(book => {
                res.render('update-book', { book, errors: error.errors })
            }) 
        }
    }
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