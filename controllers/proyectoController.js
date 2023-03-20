const mongoose = require('mongoose');
const ProyectoSchema = require('../models/proyectoModel');
const Proyecto = mongoose.model('Proyecto', ProyectoSchema);

// Lista todos los proyectos por editor (por nick)
exports.list = async (nick) => {
    let allProjects = await Proyecto.find(nick);
    return allProjects;
};

// Crear un nuevo proyecto
exports.createNew = async (datos) => {
    datos["fechaCreacion"] = Date.now();
    datos["fechaModificacion"] = Date.now();
    let newProject = new Proyecto(datos);
    let saveProject = await newProject.save();
    return saveProject;
};

// Elimina un proyecto por ID
exports.deleteId = async (id) => {
    let { nick, filename } = await this.nickFilenameId(id);
    let { deletedCount } = await Proyecto.deleteOne(id);
    // Falta validación

    if (deletedCount > 0) {
        return { nick, filename };
    } else {
        // Retornamos "nick": false y "filename": false
        // ya que así, cuando ingresen en la validación
        // de las rutas, se irán por el camino del else,
        // asumiendo que no se encontró el nick,
        // o no se encontró el filename.

        return { "nick": false, "filename": false };
    }
};

// Actualizar un proyecto por ID
exports.updateId = async (_id, data) => {
    data["fechaModificacion"] = Date.now();
    let projectUpdated = await Proyecto.updateOne(_id, data);
    
    if (projectUpdated["modifiedCount"] > 0) {
        return true;
    } else {
        return false;
    }
};

// Métodos secundarios
// Verificar existencia del proyecto por ID
exports.verifyId = async (id) => {
    return await Proyecto.find(id);
}

// Método para actualizar todos los proyectos de un usuario
exports.updateAllFromNick = async (nick, newNick) => {
    let updateProjects = await Proyecto.updateMany(nick, newNick);
    console.log({ "updateProjectsFromUpdateAllFromNick": updateProjects });
    if (updateProjects["modifiedCount"] > 0) {
        return true;
    } else {
        return false;
    }
}

// Método para tomar el nick y el 
// nombre de un proyecto dado el id de ese proyecto.
exports.nickFilenameId = async (id) => {
    let { nick, nombreVideo } = await Proyecto.findOne(id).select('nick nombreVideo');

    // Para el futuro.
    // Podría agregarse una validación en la que se verifique si el id otorgado
    // ha sido encontrado para eliminar el proyecto.

    let filename = nombreVideo;
    return { nick, filename };
}