const mongoose = require('mongoose');
const Publicacion = mongoose.model('Publicacion');

// Lista todas las publicaciones
exports.list = async () => {
    return await Publicacion.find();
};

// Crea una nueva publicación
exports.createNew = async (datos) => {
    let nuevaPublicacion = new Publicacion(datos);
    return await nuevaPublicacion.save();
};

// Elimina una publicación por ID
exports.deleteId = async (id) => {
    return await Publicacion.deleteOne(id);
};

// Actualizar una publicación por ID
exports.updateId = async (id, nuevosDatos) => {
    return await Publicacion.updateOne(id, nuevosDatos)
};

// Métodos secundarios
exports.searchId = async (id)  => {
    return await Publicacion.find(id);
};