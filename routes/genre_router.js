const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
const router = express.Router();
// const genres = require('../genres.js'); // commented out because using Mongoose now

const Genre = mongoose.model('Genre', new mongoose.Schema({ genre: { type: String, required: true } }));

function validateGenre(genre) {
    const schema = { genre: Joi.string().required() };
    return Joi.validate(genre, schema);
}

// GET all genres
router.get('/', async (req, res) => { 
    const genres = await Genre.find();
    res.send(genres); 
});

// GET one genre
router.get('/:id', async (req, res) => { 
    let genre_id = req.params.id;
    const genre = await Genre.findById(genre_id);
    (genre) ? res.send(genre) : res.status(404).send({ 'could not find': genre_id }); 
});

// POST one genre
router.post('/', (req, res) => {
    const {error} = validateGenre(req.body); if (error) return res.status(400).send(error.details[0].message);
    async function postGenre() {
        const genre = new Genre({ genre: req.body.genre });
        try { const result = await genre.save(); res.send(result); }
        catch(exception) { for (error in exception.errors) { res.send({ error: exception.errors[error].message }); } }
    } postGenre();
});

// PUT (EDIT) one genre
router.put('/:id', (req, res) => {
    let genre_id = req.params.id;
    async function editGenre() {
        const genre = await Genre.findById(genre_id);

        if (!genre) return res.status(404).send({ 'could not find': genre_id }); 
        const {error} = validateGenre(req.body); if (error) return res.status(400).send({ error: error.details[0].message });

        genre.set({ genre: req.body.genre });
        const result = await genre.save();
        res.send(result);
    } editGenre();
});

// DELETE one genre
router.delete('/:id', (req, res) => {
    let genre_id = req.params.id;

    async function deleteGenre() {
        const genre = await Genre.findById(genre_id);
        if (!genre) return res.status(404).send({ 'could not find': genre_id });
        const result = await Genre.deleteOne({ _id: genre_id });
        res.send(result);
    } deleteGenre()
});

module.exports = router;