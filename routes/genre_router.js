const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
const router = express.Router();

const Genre = mongoose.model('Genre', new mongoose.Schema({ genre: { type: String, required: true } }));

function validateGenre(genre) {
    const schema = { genre: Joi.string().required() };
    return Joi.validate(genre, schema);
}

// GET all genres
router.get('/', async (req, res) => { 
    const genres = await Genre.find().sort('genre');
    res.send(genres); 
});

// GET one genre
router.get('/:id', async (req, res) => { 
    const genre = await Genre.findById(req.params.id);
    if (!genre) res.status(404).send({ 'could not find': req.params.id }); 
    res.send(genre);
});

// POST one genre
router.post('/', async (req, res) => {
    const {error} = validateGenre(req.body); if (error) return res.status(400).send({ 'error': error.details[0].message });
    let genre = new Genre({ genre: req.body.genre });
    genre = await genre.save(); // re-use genre variable to hold the save result
    res.send(genre); // send resulting genre to the client
});

// PUT (EDIT) one genre
router.put('/:id', async (req, res) => {
    const {error} = validateGenre(req.body); 
    if (error) return res.status(400).send({ 'error': error.details[0].message });
    const genre = await Genre.findByIdAndUpdate(req.params.id, { genre: req.body.genre });
    if (!genre) return res.status(404).send({ 'could not find': req.params.id });  
    res.send(genre);
});

// DELETE one genre
router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send({ 'could not find': req.params.id });
    res.send(genre);
});

module.exports = router;