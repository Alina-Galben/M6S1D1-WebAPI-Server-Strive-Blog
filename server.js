import express from 'express';
import cors from 'cors';
import "dotenv/config";
import db from './db.js';
import './models/authorSchema.js'; // così registro lo schema all'avvio
import authorsRouter from './routers/authors.route.js'
import blogPostRouter from './routers/blogPost.route.js'


const app = express();

// Middleware
app.use(cors())
app.use(express.json())
app.use('/authors', authorsRouter)
app.use('/blogPost', blogPostRouter)


// Creazione API
app.get('/', (req, res) => {
    res.send('<h1>Ciao Alina!!!! Sei nella tua prima API - Strive Blog')
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