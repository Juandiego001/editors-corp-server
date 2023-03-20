const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicacionSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    adjunto: {
        type: Buffer,
        required: false
    },
    valida: {
        type: Boolean,
        default: true
    },
    fechaCreacion: {
        type: Date,
        required: true
    },
    fechaModificacion: {
        type: Date,
        required: false
    }
});

module.exports = PublicacionSchema;