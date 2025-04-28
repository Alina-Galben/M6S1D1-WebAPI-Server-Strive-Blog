import express from 'express';
import authorModel from '../models/authorSchema.js';

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const size = parseInt(req.query.size) || 10;
        const page = parseInt(req.query.page) || 1;
        const sortField = req.query.sortField || 'createdAt';
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
        
        const conditions =[]

        // Costruzione dinamica delle condizioni

        // 1) Nome che contiene qualcosa
        if (req.query.nome) {
            conditions.push({ nome: { $regex: req.query.nome, $options: 'i'} });
        }

        // 2) Cognome che contiene qualcosa
        if (req.query.cognome) {
            conditions.push({ cognome: { $regex: req.query.cognome, $options: 'i'} });
        }

        // 3) Data di nascita più grande di una certa data
        if (req.query.dataMinima) {
            conditions.push({ dataDiNascita: { $gte: req.query.dataMinima } });
        }

        // 4) Data di nascita più piccola di una certa data
        if (req.query.dataMassima) {
            conditions.push({ dataDiNascita: { $gte: req.query.dataMassima } });
        }

        // 5) Costruisco il filtro finale
        const filter = conditions.length > 0 ? { $and: conditions } : {};

        const authors = await authorModel.find(filter).sort({ [sortField]: sortOrder }).limit(size).skip((page - 1) * size);

        res.status(200).json(authors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const author = await authorModel.findById(id);
        res.status(200).json(author);
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})

router.post('/', async (req, res) => {
    const obj = req.body;
    const author = new authorModel(obj);
    const dbAuthor = await author.save();
    res.status(201).json(dbAuthor);
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const obj = req.body;
    try {
        const authorUpdate = await authorModel.findByIdAndUpdate(id, obj)
        res.status(200).json(authorUpdate)
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await authorModel.findByIdAndDelete(id);
        res.status(200).json({message: "Author Deleted"})
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})

export default router;