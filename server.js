const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();
const port = process.env.PORT;
const DB = process.env.DB;

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let { nick } = req.body;

        let theDir = `./public/${nick}`;
        let dirExists = fs.existsSync(theDir);
        if (!dirExists) {
            fs.mkdir(theDir, (err) => {
                if (err) {
                    console.log("Ocurrió un error al intentar crear la carpeta");
                    throw new Error("No logró crear la carpeta del editor");
                }
            })
        };

        cb(null, `./public/${nick}`);
    },

    filename: async (req, file, cb) => {
        let { nick } = req.body;
        
        function callReaddir() {
            return new Promise(resolve => {
                fs.readdir(`./public/${nick}`, (err, files) => {
                    if (!err) {
                        resolve(files.length)
                    } else {
                        throw new Error("Ocurrió un error mientras se intentaba leer la cantidad de archivos de un editor");
                    }
                });
            })
        }

        let lengthFiles = await callReaddir();
        let theFile = file.originalname;
        let suffix = theFile.split(".")[1];
        let fullName = lengthFiles + "." + suffix;

        cb(null, fullName);
    }
});

const upload = multer({ storage: storage });

// Conexión a la base de datos
mongoose.connect(DB)
    .then(db => console.log('DB is connected!'))
    .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// Routes
const routes = require('./routers/editors.routes');
routes(app, upload);

app.listen(port || 3001, () => {
    console.log('Server on port 3000');
});