// Required 
const express = require('express');
const app = express();
const Joi = require('joi'); // validations
const genre_router = require('./routes/genres_route.js');

app.use(express.json()); // try commenting this out later to see what breaks
app.use('api/genres', genre_router);

// Server Setup
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server online at port ${port}`));

