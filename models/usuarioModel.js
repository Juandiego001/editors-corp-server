const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    nick: {
        type: String,
        required: true
    },
    categorias: {
        type: [String],
        required: true
    },
    biografia: {
        type: String,
        required: false
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    },
    dinero: {
        type: Number,
        required: true,
        default: 0
    },
    foto: {
        type: Buffer,
        required: false
    },
    fechaCreacion: {
        type: Date,
        required: true
    },
    fechaModificacion: {
        type: Date,
        required: false
    },
    fechaModificacionNick: {
        type: Date,
        required: false
    }
});

module.exports = UsuarioSchema;