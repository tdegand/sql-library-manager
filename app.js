const express = require("express");
const app = express();
const Sequelize = require("sequelize")

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

//handles errors
app.use(function (err, req, res, next) {
	console.error(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0");
