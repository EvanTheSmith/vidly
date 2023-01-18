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

// GET all genres
app.get('/api/genres', (req, res) => { 
    res.send(genres);
});

// GET one genre
app.get('/api/genres/:id', (req, res) => { 
    let genre_id = parseInt(req.params.id);
    let genre = genres.find(g => g.id === genre_id);
    (genre) ? res.send(genre) : res.status(404).send(`Could not find ${genre_id}`);
});

// POST one genre
app.post('/api/genres', (req, res) => {

});