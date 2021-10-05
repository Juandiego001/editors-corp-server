const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Models
const Usuario = require('./models/usuarioModel');
const Trato = require('./models/tratoModel')
const Publicacion = require('./models/publicacionModel')
const Proyecto = require('./models/proyectoModel')
const Opinion = require('./models/opinionModel')

// Conexión a la base de datos
const uri = 'mongodb+srv://admin:oracle11g@clusterdb.rqdng.mongodb.net/Editors?retryWrites=true&w=majority';
mongoose.connect(uri)
    .then(db => console.log('DB is connected!'))
    .catch(err => console.log(err));


// Middleware
app.use(cors());
app.use(express.json());

// Routes
const routes = require('./routers/editors.routes');
routes(app);

app.listen(3000, () => {
    console.log('Server on port 3000');
});