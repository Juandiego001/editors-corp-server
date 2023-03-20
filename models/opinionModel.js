const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OpinionSchema = new Schema({
    nickTo: {
        type: String,
        required: true
    },
    nickFrom: {
        type: String,
        required: false
    },
    estrellas: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
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

module.exports = OpinionSchema;