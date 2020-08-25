const express = require('express');
const app = express();

//serves all static files
app.use('/static', express.static('public'))

//sets view engine to render pug templates
app.set('view engine', 'pug')


const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0");