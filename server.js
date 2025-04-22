import express from 'express';
import cors from 'cors';
import "dotenv/config";
import db from './db.js';
import './models/author.js'; // così registro lo schema all'avvio
import authorModel from './models/author.js';


const app = express();

// Middleware
app.use(cors())
app.use(express.json())


// Creazione API
app.get('/', (req, res) => {
    res.send('<h1>Ciao Alina!!!! Sei nella tua prima API - Strive Blog')
})

app.get('/authors', async (req, res) => {
    const authors = await authorModel.find();
    res.status(200).json(authors)
})

app.get('/authors/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const author = await authorModel.findById(id);
        res.status(200).json(author);
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})

app.post('/authors', async (req, res) => {
    const obj = req.body;
    const author = new authorModel(obj);
    const dbAuthor = await author.save();
    res.status(201).json(dbAuthor);
})

app.put('/authors/:id', async (req, res) => {
    const id = req.params.id;
    const obj = req.body;
    try {
        const authorUpdate = await authorModel.findByIdAndUpdate(id, obj)
        res.status(200).json(authorUpdate)
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})

app.delete('/authors/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await authorModel.findByIdAndDelete(id);
        res.status(200).json({message: "Author Deleted"})
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})

// Avvio del server SOLO dopo la connessione al DB
const startServer = async () => {
    try {
        await db();
        app.listen(process.env.PORT, () => {
            console.log('Server is running on port ' + process.env.PORT);
        });
    } catch (error) {
        console.error('Server not started due to DB connection error');
    }
};

startServer();

/*app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' +process.env.PORT);
})
*/