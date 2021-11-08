const mongoose = require('mongoose');
const Trato = mongoose.model('Trato');

// Lista todos los tratos que tiene el usuario (por nickname)
exports.list = async (nickname) => {
    return await Trato.find(nickname);
};

// Crea un nuevo trato
exports.createNew = async (datos) => {
    let nuevoTrato = new Trato(datos);
    return await nuevoTrato.save();
};

// Actualizar un trato por nick-id
exports.updateId = async (id, nuevosDatos) => {
    return await Trato.updateOne(id, nuevosDatos);
};

// Elimina un trato por ID
exports.deleteId = async (id) => {
    return await Trato.deleteOne(id);
};

// Métodos secundarios
// Verificar ID
exports.verifyId = async (id) => {
    return await Trato.find(id);
}