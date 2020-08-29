'use strict'

//***********List of Packages

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
require('dotenv').config();
const DATABASE_URL = process.env.DATABASE_URL;

//********************Global Variables

const PORT = process.env.PORT || 3003;
const app = express();
const methodOverride = require('method-override');
const { response } = require('express');

const client = new pg.Client(DATABASE_URL);
client.on('error', error => console.error(error));


//Server config and start
// all of these will check requests
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static('./public'));
/*when we receive data from the frontend, we receive the URL encoded
which creates the body*/
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.get('/books/:id', getSingleBook);

function getSingleBook(request, response){
  client.query('SELECT * FROM store_books WHERE id=$1', [request.params.id])
    .then(result => {
      response.render('pages/books/detail', {book : result.rows[0]});
    })
}


//********************Routes

app.get('/', (request, response) => {
  //we need to get params and then we can complete our query
  //get the books from the database with a query
  const sqlTable = (`SELECT * FROM store_books`);
  client.query(sqlTable)
    .then(result => {
      console.log(result);
      response.render('pages/index', {bookArray : result.rows});
    })
    .catch(error => {
      handleError(error, response);
    });
});

app.get('/searches/new', (request, response) => {
  response.render('pages/searches/new');
  //we are passing in a file that we've built using render
});


app.post('/books', (request, response) => {
  const {author, title, isbn,image_url, description} = request.body;
  const values = [author, title, isbn,image_url, description];
  const mySql = `INSERT INTO store_books (author, title, isbn, image_url, description) VALUES ($1, $2, $3,$4, $5)`;
  client.query(mySql, values)
    .then( result => {
      response.redirect('/pages/books/detail', {bookArray:result.rows});
    })
    .catch(error => {
      handleError(error, response);
    });
});







//create a route that is an app.post route
// we need information from the user to make a request to GoogleBooks API
//POST route is for anytime we need information from the user
//when the form is submittted, we want the URL to be called
//post route needs to match the action in the form


app.post('/searches/new', (request, response) => {
  let search = request.body.search;
  let string = `https://www.googleapis.com/books/v1/volumes?q=+in${search[1]}:${search[0]}`;
  superagent.get(string)
    .then(books => {
      let bookArray = books.body.items.map(response => {
        //items is the array of data coming back from the API
        return new Book(response);
      });
      response.render('pages/books/show', {bookArray : bookArray});
      //we will basically insert the file path above and then use the {key:value}
      // the key above will be used in our EJS when we loop through array
    })
    .catch(error => {
      handleError(error, response);
    });
});

function handleError(error, response){
  console.error(error);
  response.render('error', {error});
}



//ternary operator
//that thing defined in js ? set it to ----- : otherwise set it to default image


/***************CONSTRUCTORS */
//Make constructor function to normalize data we recieve back from API
//Instead of sending back entire body, we will send back array of new constructor books
// FOr example = const locationConstructor = new Location(superAgentResultArray, thingToSearch);
// Add our new constructor inside superagent
//Send object to another page and we would write EJS on that page to loop through the array we sent pages from server


function Book (searchData) {
  const volumeInfo = searchData.volumeInfo;
  //if there is a thumbnail, then use this, else use this
  this.image = volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail ? volumeInfo.imageLinks.thumbnail : `https://i.imgur.com/J5LVHEL.jpg`;
  if (!this.image.startsWith('https')){
    this.image = 'https' + this.image.slice(4);
  }
  this.title = volumeInfo.title;
  this.authors = volumeInfo.authors; // this is not a single value, but an array of authors
  // when we decide to access this property in the template, remember that it is an array
  this.isbn = volumeInfo.isbn;
  this.publisher = volumeInfo.publisher;
  this.description = volumeInfo.description;
  this.pageCount = volumeInfo.pageCount;
}


app.get('*', handleError);
// this proves that the handleError function is working



//start the server
client.connect()
  .then(() => {
    app.listen(PORT,() => console.log(`listening on port ${PORT}`));
  });
