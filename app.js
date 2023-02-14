// Required 
const express = require('express');
const app = express();
const genre_router = require('./routes/genre_router.js');

// Server Setup
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server online at port ${port}`));

// Middleware
app.use(express.json()); // try commenting this out later to see what breaks
app.use('/api/genres', genre_router);