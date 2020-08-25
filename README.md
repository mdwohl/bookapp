# Project Name: book_app
**Author**: Michael Wohl & Riva Davidowski
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
This app implements a basic full-stack application for a book list which will include the ability to search the Google Books API, add books to a database, and then render those books from a PostgreSQL database. This app also provides the ability to update the details of a book or remove it from the collection.

## Getting Started
* Create a basic `server.js file`. 
* We made sure the server is listening for connections on a `PORT`. The view engine needs to be set and serve your static CSS files.
* Installed necessary NPM packages and ensured that they are documented as dependencies in  `package.json`.
* For server-side rendering, EJS looks for a folder called `views`. I had to create a `views` folder, with a `pages` subfolder. 
* Within this subfolder, I created a file called `index.ejs`. 
**Note: with server-side rendering, index.ejs is analogous to the typical index.html file that we are used to, but will also allow EJS syntax for templating.**
* Created a basic HTML scaffold in `index.ejs` file which contains several elements that can be viewed in the browser, such as a heading element that says `"Hello World"`. 
* Created a basic CSS file with several rules, such as an obvious background color. These served as a "proof of life" that the files are connected as expected, both locally and when deployed.
* For testing purposes, we included a temporary route such as `app.get('/hello')` and rendered my `index.ejs` file. I turned on the server and validated that the HTML elements and basic CSS styles are being rendered as expected. This route is useful for the future if I need to test an application without relying on data from a database.

## Architecture
* For this project, we are using EJS for JS templating, Git, Github, Node.js to run Nodemon environment, Express and Google Books APIs.

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with GET and POST routes for the book resource.

## Credits and Collaborations

----------------------------

Number and name of feature: **FEATURE 1**: Scaffolding of files for set up and test route creatiion
**Scaffolding of HTML files and server-side rendering and implementation of a test route to validate that the HTML elements and basic CSS styles are being rendered as expected**

Estimate of time needed to complete: 2hrs

Start time: 4:00pmpm, 8/24/2020

Finish time: 5pm

Actual time needed to complete: 1hr

------
Number and name of feature: **FEATURE 2**: Implementing a app.post route that allows user to search the Google Books API so that they can view the results their search

Estimate of time needed to complete: 1hrs

Start time: 5pm: 8/24/2020

Finish time: 6:08

Actual time needed to complete: 1hr8min

-----------------
Number and name of feature: **FEATURE 3**: Creating constructor function and a route handler for a `POST` request to `/searches`. This route's callback will use Superagent to proxy a request to the Google Books API and return a list of ten books that match the search query.

Estimate of time needed to complete: 2hrs

Start time: 611pm 8/24/2020

Finish time: 

Actual time needed to complete: 
