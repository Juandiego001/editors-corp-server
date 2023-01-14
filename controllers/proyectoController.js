const mongoose = require('mongoose');
const Proyecto = mongoose.model('Proyecto');

// Lista todos los proyectos por editor (por nick)
exports.list = async (nickname) => {
    return await Proyecto.find(nickname);
};

// Crear un nuevo proyecto
exports.createNew = async (datos) => {
    let nuevoProyecto = new Proyecto(datos);
    return await nuevoProyecto.save();
};

// Elimina un proyecto por ID
exports.deleteId = async (Id) => {
    return await Proyecto.deleteOne(Id);
};

// Actualizar un proyecto por ID
exports.updateId = async (id, nuevosDatos) => {
    return await Proyecto.updateOne(id, nuevosDatos);
};

// Métodos secundarios
// Verificar existencia del proyecto por ID
exports.verifyId = async (id) => {
    return await Proyecto.find(id);
}