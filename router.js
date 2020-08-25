const express = require('express');
const router = express.Router();

//index page to get it started
router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router