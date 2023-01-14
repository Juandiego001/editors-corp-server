const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProyectoSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    video: {
        type: Buffer,
        required: false
    }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);