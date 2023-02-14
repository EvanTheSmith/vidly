const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })

const genreSchema = new mongoose.Schema(
    { genre: { type: String, required: true } }
);

async function createGenre() {
    const genre = new Genre({ type: 'horror', });
    try { const result = await genre.save(); console.log(result); }
    catch(exception) { for (error in exception.errors) { console.log(exception.errors[error].message); } }
}