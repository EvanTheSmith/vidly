// Required 
const express = require('express');
const app = express();
const genres = require('./genres.js');
const Joi = require('joi'); // validations
app.use(express.json()); // try commenting this out later to see what breaks

// Server Setup
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server online at port ${port}`));

// Server Request Handling