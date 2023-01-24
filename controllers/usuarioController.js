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
exports.nickUser = async (nickname) => {
    return await Usuario.findOne(nickname);
};