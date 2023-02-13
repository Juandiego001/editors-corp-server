const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProyectoSchema = new Schema({
    nick: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    nombreVideo: {
        type: String,
        required: true
    }
});

module.exports = ProyectoSchema;