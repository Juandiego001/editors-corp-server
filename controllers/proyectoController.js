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
    let newProject = new Proyecto(datos);
    let saveProject = await newProject.save();
    return saveProject;
};

// Elimina un proyecto por ID
exports.deleteId = async (id) => {
    let { nick, filename } = await this.nickFilenameId(id);
    let deletedProject = await Proyecto.deleteOne(id);
    // Falta validación
    return { nick, filename };
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

// Método para actualizar todos los proyectos de un usuario
exports.updateAllFromNick = async (nick, newNick) => {
    let allProjects = await this.list(nick);
    console.log({"allProjectsFromUpdateAllFromNick": allProjects});
    if (allProjects.length = 0) {
        return true;
    } else {
        let updateProjects = await Proyecto.updateMany(nick, newNick);
        console.log({"updateProjectsFromUpdateAllFromNick": updateProjects});
        if (updateProjects["modifiedCount"] > 0) {
            return true;
        } else {
            return false;
        }
    }
}

// Método para tomar el nick y el 
// nombre de un proyecto dado el id de ese proyecto.
exports.nickFilenameId = async (id) => {
    let { nick, nombreVideo } = await Proyecto.findOne(id).select('nick nombreVideo');
    let filename = nombreVideo;
    return { nick, filename };
}