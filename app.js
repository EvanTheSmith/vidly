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

function validateGenre(genre) {
    const schema = { genre: Joi.string().required() };
    return Joi.validate(genre, schema);
}

// GET all genres
app.get('/api/genres', (req, res) => res.send(genres));

// GET one genre
app.get('/api/genres/:id', (req, res) => { 
    let genre_id = parseInt(req.params.id);
    let genre = genres.find(g => g.id === genre_id);
    (genre) ? res.send(genre) : res.status(404).send(`Could not find ${genre_id}`); 
    // send genre if found, 404 and error message if not
});

// POST one genre
app.post('/api/genres', (req, res) => {
    const {error} = validateGenre(req.body); if (error) return res.status(400).send(error.details[0].message);
    let genre = { id: genres.length, genre: req.body.genre };
    genres.push(genre);
    res.send(genre);
});

// PUT (EDIT) one genre
app.put('/api/genres/:id', (req, res) => {
    let genre_id = parseInt(req.params.id);
    let genre = genres.find(g => g.id === genre_id);
    if (!genre) return res.status(404).send(`Could not find ${genre_id}`); 

    const {error} = validateGenre(req.body); if (error) return res.status(400).send(error.details[0].message);

    genre.genre = req.body.genre;
    res.send(genre);
});

// DELETE one genre
app.delete('/api/genres/:id', (req, res) => {
    let genre_id = parseInt(req.params.id);
    let genre = genres.find(g => g.id === genre_id);
    if (!genre) return res.status(404).send(`Could not find ${genre_id}`); 

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});