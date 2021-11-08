const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TratoSchema = new Schema({
    nickEditor: {
        type: String,
        required: true
    }, 
    nickCliente: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    fechaLimite: {
        type: Date,
        required: false
    },
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        type: Number,
        required: true,
        default: 1
    },
    resumen: {
        type: Buffer,
        required: false
    },
    entregable: {
        type: Buffer,
        required: false
    },
    observaciones: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Trato', TratoSchema);