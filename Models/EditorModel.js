var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let EditorSchema = new Schema({
    correo: {
        type: String,
        Required: "El correo electronico es requerido"
    },

    contraseña: {
        type: String,
        Required: "La contraseña es requerida"

    }
});

module.exports = mongoose.model("Editor", EditorSchema);