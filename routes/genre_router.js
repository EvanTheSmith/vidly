const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
const router = express.Router();
// const genres = require('../genres.js'); // commented out because using Mongoose now

const genreSchema = new mongoose.Schema(
    { genre: { type: String, required: true } }
);

const Genre = mongoose.model('Genre', genreSchema);

// Mongoose server requests
async function getGenres() { 
    const genres = await Genre.find(); 
    return genres;
}

function validateGenre(genre) {
    const schema = { genre: Joi.string().required() };
    return Joi.validate(genre, schema);
}

// GET all genres
router.get('/', (req, res) => { 
    (async () => res.send(await Genre.find()))()
});

// GET one genre
router.get('/:id', (req, res) => { 
    let genre_id = parseInt(req.params.id);
    let genre = genres.find(g => g.id === genre_id);
    (genre) ? res.send(genre) : res.status(404).send(`Could not find ${genre_id}`); 
    // send genre if found, 404 and error message if not
});

// POST one genre
router.post('/', (req, res) => {
    const {error} = validateGenre(req.body); if (error) return res.status(400).send(error.details[0].message);
    let genre = { id: genres.length, genre: req.body.genre };
    genres.push(genre);
    res.send(genre);
});

// PUT (EDIT) one genre
router.put('/:id', (req, res) => {
    let genre_id = parseInt(req.params.id);
    let genre = genres.find(g => g.id === genre_id);
    if (!genre) return res.status(404).send(`Could not find ${genre_id}`); 

    const {error} = validateGenre(req.body); if (error) return res.status(400).send(error.details[0].message);

    genre.genre = req.body.genre;
    res.send(genre);
});

// DELETE one genre
router.delete('/:id', (req, res) => {
    let genre_id = parseInt(req.params.id);
    let genre = genres.find(g => g.id === genre_id);
    if (!genre) return res.status(404).send(`Could not find ${genre_id}`); 

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});

module.exports = router;