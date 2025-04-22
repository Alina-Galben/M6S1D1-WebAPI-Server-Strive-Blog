import mongoose from "mongoose";

/*// Nome del database
const dbName = 'sample_mflix'
*/

// Lo SCHEMA di Mongoose sara la struttura di ogni oggetto che salvero nella Collection
const authorsSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    email: { type: String, required: true },
    dataDiNascita: { type: String, required: true },
    avatar: { type: String, required: true },
})

const authorModel = mongoose.model('Authors', authorsSchema);
export default authorModel;