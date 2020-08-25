const express = require('express');
const app = express();

//import routes
const routes = require('./router.js');

//serves all static files
app.use(express.static('public'))
app.use(express.static('stylesheet'))

//sets view engine to render pug templates
app.set('view engine', 'pug')

//uses the routes file to route the user to the proper page
app.use(routes)

//handles errors
app.use(function (err, req, res, next) {
    console.error(error.stack)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0");