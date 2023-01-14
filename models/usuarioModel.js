const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    nick: {
        type: String,
        required: true
    },
    tipo: {
        type: Number,
        required: true
    },
    tipoEditor: {
        type: String,
        required: false
    },
    biografia: {
        type: String,
        required: false
    },
    nombre: {
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
    }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);