const mongodb = require('mongodb');
const fs = require('fs');
const uri = 'mongodb+srv://admin:oracle11g@clusterdb.rqdng.mongodb.net/Editors?retryWrites=true&w=majority';

module.exports = function (app) {
    const cUsuario = require('../controllers/usuarioController.js');
    const cProyecto = require('../controllers/proyectoController.js');
    const cPublicacion = require('../controllers/publicacionController.js');
    const cTrato = require('../controllers/tratoController.js');
    const cOpinion = require('../controllers/opinionController.js');

    // Rutas principales para proyecto
    app.route('/proyecto')

        // Listar todos los proyectos de un editor
        .get((req, res) => {
            cProyecto.list(req.query)
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })

        // Crear un proyecto a un editor
        // Anteriormente, desde el cliente, se valida que el nick exista.
        .post((req, res) => {
            cProyecto.createNew(req.body)
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })

        // Actualizar el proyecto de un editor
        .put((req, res) => {
            cProyecto.updateId({ _id: req.body._id }, req.body)
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })

        // Eliminar el proyecto de un editor
        .delete((req, res) => {
            cProyecto.deleteId(req.body)
                .then(data => res.send(data))
                .catch(err => res.send(err));
        });

    // Rutas secundarias para proyecto
    app.route('/proyecto-verificar-id')

        // Verificar existencia de proyecto por id
        .get((req, res) => {
            cProyecto.verifyId(req.query)
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })

    // Rutas principales para publicación
    app.route('/publicacion')

        // Listar todas las publicaciones
        .get((req, res) => {
            cPublicacion.list()
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })

        // Crear una publicación
        .post((req, res) => {
            cPublicacion.createNew(req.body)
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })

        // Actualizar una publicación
        .put((req, res) => {
            cPublicacion.updateId({ _id: req.body._id }, req.body)
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })

        // Eliminar una publicación
        .delete((req, res) => {
            cPublicacion.deleteId(req.body)
                .then(data => res.send(data))
                .catch(err => res.send(err));
        });

    // Rutas secundarias para publicación
    app.route('/publicacion-verificar-id')
        .get((req, res) => {
            cPublicacion.searchId({ _id: req.query._id })
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })

    // Rutas principales para trato
    app.route('/trato')

        // Listar todos los tratos del usuario
        .get((req, res) => {
            cTrato.list(req.query)
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })

        // Crear un nuevo trato editor-usuario
        .post((req, res) => {
            cTrato.createNew(req.body)
                .then(data => res.send(data))
                .catch(err => res.send(err));

        })

        // Actualizar un trato 
        .put((req, res) => {
            let id = {
                _id: req.body._id
            };

            cTrato.updateId(id, req.body)
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })

        // Eliminar un trato por id
        .delete((req, res) => {
            cTrato.deleteId(req.body)
                .then(data => res.send(data))
                .catch(err => res.send(err));
        });

    // Rutas secundarias para trato
    app.route('/trato-verificar-id')

        // Verificar que existe un trato para el id
        .get((req, res) => {
            cTrato.verifyId(req.query)
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })

    // Rutas principales para usuario
    app.route('/usuario')

        // Para registrarse
        .post((req, res) => {
            cUsuario.createNew(req.body)
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })

        // Para actualizar el usuario
        .put((req, res) => {
            cUsuario.updateNick({ nick: req.body.nick }, req.body)
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })

        // Para eliminar un usuario
        .delete((req, res) => {
            cUsuario.deleteNick({ nick: req.body.nick })
                .then(data => res.send(data))
                .catch(err => res.send(err));
        });

    app.route('/usuario-login')

        .post((req, res) => {
            cUsuario.logIn(req.body)
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })

    // Rutas secundarias para usuario
    app.route('/usuario/datos')

        .get((req, res) => {

            cUsuario.nickUser(req.query)
                .then(response => {
                    res.json({
                        "nombre": response["nombre"],
                        "apellido": response["apellido"],
                        "biografia": response["biografia"]
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        "code": 500,
                        "message": "Ocurrió un error mientras se intentó consultar el usuario mediante el nick en la base de datos."
                    })
                })
        })

    app.route('/usuario-verificar-nick')

        // Verificar si ya existe o no un nickname
        .get((req, res) => {
            cUsuario.nickUser(req.query)
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })

    app.route('/usuario-listar')

        // Listar todos los usuarios
        .get((req, res) => {
            cUsuario.list()
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })


    // Rutas para videos por _id
    app.route('/videos/:_id')

        // Obtener video por _id
        .get((req, res) => {
            mongodb.MongoClient.connect(uri, function (error, client) {
                if (error) {
                    res.status(500).json(error);
                    return;
                }

                const db = client.db('Editors');

                // GridFS Collection
                db.collection('fs.files').findOne({}, (err, video) => {

                    if (!video) {
                        res.status(404).send("No video uploaded!");
                        return;
                    }

                    // Create response headers
                    const videoSize = video.length;
                    const start = 0;
                    console.log("START:");
                    console.log(start);
                    const end = videoSize - 1;


                    const contentLength = end - start + 1;
                    const headers = {
                        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                        "Accept-Ranges": "bytes",
                        "Content-Length": contentLength,
                        "Content-Type": "video/mp4",
                    };

                    // HTTP Status 206 for Partial Content
                    res.writeHead(206, headers);

                    const bucket = new mongodb.GridFSBucket(db);
                    const downloadStream = bucket.openDownloadStreamByName('bigbuck', {
                        start
                    });

                    // Finally pipe video to response
                    downloadStream.pipe(res);
                });
            });
        })

    // Rutas para videos
    app.route('/video')

        // Obtener todos los videos
        .get((req, res) => {
            mongodb.MongoClient.connect(uri, function (error, client) {
                if (error) {
                    res.status(500).json(error);
                    return;
                }

                const range = req.headers.range;
                if (!range) {
                    res.status(400).send("Requires Range header");
                }

                const db = client.db('Editors');
                // GridFS Collection
                db.collection('fs.files').find({}, (err, video) => {
                    if (!video) {
                        res.status(404).send("No video uploaded!");
                        return;
                    }

                    // Create response headers
                    const videoSize = video.length;
                    const start = Number(range.replace(/\D/g, ""));
                    const end = videoSize - 1;

                    const contentLength = end - start + 1;
                    const headers = {
                        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                        "Accept-Ranges": "bytes",
                        "Content-Length": contentLength,
                        "Content-Type": "video/mp4",
                    };

                    // HTTP Status 206 for Partial Content
                    res.writeHead(206, headers);

                    const bucket = new mongodb.GridFSBucket(db);
                    const downloadStream = bucket.openDownloadStreamByName('bigbuck', {
                        start
                    });

                    // Finally pipe video to response
                    downloadStream.pipe(res);
                });
            });
        })

        // Subir video
        .post((req, res) => {
            mongodb.MongoClient.connect(uri, function (error, client) {
                if (error) {
                    res.json(error);
                    return;
                }

                const db = client.db('Editors');
                const bucket = new mongodb.GridFSBucket(db);
                const videoUploadStream = bucket.openUploadStream(req.file.originalname);
                const videoReadStream = fs.createReadStream('../frontend/public/uploads/' + req.file.originalname);
                videoReadStream.pipe(videoUploadStream);
                res.status(200).send("Done...");
            });
        })
}