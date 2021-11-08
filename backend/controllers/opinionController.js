const mongoose = require('mongoose');
const Opinion = mongoose.model('Opinion');

// Listar todas las opiniones
exports.list = async () => {
    return await Opinion.find({}, function (err, results) {
        if (err) {
            return err;
        } else {
            return results;
        }
    });
};

// Crear una nueva opinión
exports.createNew = async (datos) => {
    let nuevaOpinion = new Opinion(datos);
    return await nuevaOpinion.save(function (err, results) {
        if (err) {
            return err;
        } else {
            return results;
        }
    });
};

// Elimina la opinión por ID
exports.deleteId = async (datos) => {
    return await Opinion.deleteOne(datos, function (err, results) {
        if (err) {
            return err;
        } else {
            return results;
        }
    });
};

// Actualizar una opinión por ID
exports.updateId = async (datos) => {
    return await Opinion.updateOne(datos, function (err, results) {
        if (err) {
            return err;
        } else {
            return results;
        }
    })
};