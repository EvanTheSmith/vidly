const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })

const genreSchema = new mongoose.Schema({ 
        genre: { type: String, required: true }
});

const Genre = mongoose.model('Genre', genreSchema);

async function createGenre() {
    const genre = new Genre({ genre: 'childrens', });
    try { const result = await genre.save(); console.log(result); }
    catch(exception) { for (error in exception.errors) { console.log(exception.errors[error].message); } }
}

createGenre();