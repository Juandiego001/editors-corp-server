const mongoose = require('mongoose');
const OpinionSchema = require('../models/opinionModel');
const Opinion = mongoose.model('Opinion', OpinionSchema);

// Listar todas las opiniones
exports.list = async (nickTo) => {
    return await Opinion.find(nickTo);
};

// Crear una nueva opinión
exports.createNew = async (datos) => {
    let nuevaOpinion = new Opinion(datos);
    return await nuevaOpinion.save();
};

// Elimina la opinión por ID
exports.deleteId = async (id) => {
    return await Opinion.deleteOne(id);
};

// Actualizar una opinión por ID
exports.updateId = async (id) => {
    return await Opinion.updateOne(id);
};