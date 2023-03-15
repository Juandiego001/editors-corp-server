const mongoose = require('mongoose');
const UsuarioSchema = require("../models/usuarioModel");
const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Métodos principales
// Listar todos
exports.list = async () => {
    return Usuario.find();
}

// Verificar inicio de sesión
exports.logIn = async (datos) => {
    let theUser = await Usuario.findOne(datos);
    return theUser;
}

// Registrarse
exports.createNew = async (datos) => {
    let nuevoUsuario = new Usuario(datos);
    return await nuevoUsuario.save();
};

// Eliminar cuenta (por nickname)
exports.deleteNick = async (nickname) => {
    return await Usuario.deleteOne(nickname);
};

// Actualizar datos del usuario (por nickname)
exports.updateNick = async (nickname, nuevosDatos) => {
    return await Usuario.updateOne(nickname, nuevosDatos);
};

// Métodos adicionales
// Retornar nombre de usuario
exports.nickUser = async (nick) => {
    let nickExists = await Usuario.findOne(nick);
    return nickExists ? true : false;
};

// Verificar si existe un correo
exports.verifyEmail = async (correo) => {
    let emailExists = await Usuario.findOne(correo);
    return emailExists ? true : false;
}

exports.searchEditors = async (nick) => {
    let foundUsers = await Usuario.find({nick: {$regex: '.*' + nick + '.*'}});
    return foundUsers;
}

exports.allData = async (nick) => {
    let theUser = await Usuario.findOne(nick);
    return theUser;
}