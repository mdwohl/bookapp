'use strict'

//List of Packages
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
require('dotenv').config();

//Global Variables
const PORT = process.env.PORT || 3003;
const app = express();

//Server config and start
app.use(cors());
app.listen(PORT, () => console.log(`listening to port: ${PORT}`));
