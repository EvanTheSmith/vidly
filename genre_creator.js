const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const thisFixesTheBugs = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect('mongodb://localhost/vidly', thisFixesTheBugs)

const genreSchema = new mongoose.Schema({ 
    genre: { type: String, required: true }
});

const Genre = mongoose.model('Genre', genreSchema);

async function createGenre() {
    const genre = new Genre({ genre: 'childrens', });
    try { const result = await genre.save(); console.log(result); }
    catch(e) { for (error in e.errors) { console.log(e.errors[error].message); } }
}

createGenre();