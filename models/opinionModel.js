const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OpinionSchema = new Schema({
    estrellas: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Opinion', OpinionSchema);