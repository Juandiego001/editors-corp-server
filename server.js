const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config();
const port = process.env.PORT;
const DB = process.env.DB;
const multer = require('multer');

// Conexión a la base de datos
mongoose.connect(DB)
    .then(db => console.log('DB is connected!'))
    .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../frontend/public/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, file.originalname);
    }
});

app.use(multer({storage: storage}).single('adjunto'));

// Routes
const routes = require('./routers/editors.routes');
routes(app);

app.listen(port || 3001, () => {
    console.log('Server on port 3000');
});