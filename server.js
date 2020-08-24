'use strict'

//List of Packages
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
const serveStatic = require('serve-static');
const { request } = require('http');
require('dotenv').config();

//Global Variables
const PORT = process.env.PORT || 3003;
const app = express();

//Server config and start
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static('./public'));
app.listen(PORT, () => console.log(`listening to port: ${PORT}`));

//Routes
app.get('/hello', (request, response) => {
  response.render('pages/index');
});
app.get('/search', (request, response) => {
  response.render('searches/new');
});
