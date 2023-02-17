const mongoose = require('mongoose');
const ProyectoSchema = require('../models/proyectoModel');
const Proyecto = mongoose.model('Proyecto', ProyectoSchema);

// Lista todos los proyectos por editor (por nick)
exports.list = async (nick) => {
    return await Proyecto.find(nick);
};

// Crear un nuevo proyecto
exports.createNew = async (datos) => {
    let nuevoProyecto = new Proyecto(datos);
    return await nuevoProyecto.save();
};

// Elimina un proyecto por ID
exports.deleteId = async (id) => {
    return await Proyecto.deleteOne(id);
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