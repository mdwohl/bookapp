'use strict'

//List of Packages
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
const serveStatic = require('serve-static');
require('dotenv').config();

//Global Variables
const PORT = process.env.PORT || 3003;
const app = express();

//Server config and start
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static('./public'));
/*when we receive data from the frontend, we receive the URL encoded
which creates the body*/
app.use(express.urlencoded({extended:true}));
app.listen(PORT, () => console.log(`listening to port: ${PORT}`));

//Routes
app.get('/hello', (request, response) => {
  response.render('pages/index');
});
app.get('/search', (request, response) => {
  response.render('searches/new');
  //we are passing in a file that we've built using render
});

//create a route that is an app.post route
// we need information from the user to make a request to GoogleBooks API
//POST route is for anytime we need information from the user
//when the form is submittted, we want the URL to be called
//post route needs to match the action in the form
app.post('/searches/new', (request, response) => {
  console.log(request.body);
  let search = request.body.search;
  let string = `https://www.googleapis.com/books/v1/volumes?q=+in${search[1]}:${search[0]}`;
  superagent.get(string)
    .then(books => {
      //we will still have response.send but we will also have page we will send them to here as well
      response.send(books.body);
      //response.send('fileImGonna Create', { banana:books.body(or object name to right of colon)});
      //we will basically insert the file path above and then use the {key:value}
      // the key above will be used in our EJS when we loop through array
    })
    .catch(error => {
      console.log(error);
      response.status(500).send(error, 'Bad Request, Internal Server Error');
    });
});




/***************CONSTRUCTORS */
//Make constructor function to normalize data we recieve back from API
//Instead of sending back entire body, we will send back array of new constructor books
// FOr example = const locationConstructor = new Location(superAgentResultArray, thingToSearch);
// Add our new constructor inside superagent
//Send object to another page and we would write EJS on that page to loop through the array we sent pages from server


// function Book (obj, search) {
//   this.author = 
//   this.title = 
//   this.description =
//   this.image =
// }
