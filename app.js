const express = require("express");
const app = express();
const Sequelize = require("sequelize")
const bodyParser = require('body-parser');

//for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

//check connection to DB
const sequelize = new Sequelize({
	dialect: 'sqlite',
  storge: './library.db',
  logging: false
})

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`);
  })
  .catch(err => {
    console.error('Could not create database & tables..')
  }) 
  

//import routes
const routes = require("./router.js");

//serves all static files
app.use(express.static("public"));
app.use(express.static("stylesheet"));

//sets view engine to render pug templates
app.set("view engine", "pug");

//uses the routes file to route the user to the proper page
app.use(routes);

/* Error Handler */
app.use((err, req, res, next) => {
  res.locals.error = err
  res.status = err.status
  if(err.status === undefined) {
    err.status = 404
  }
  console.error(err)
  res.render('error', { err })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0");
