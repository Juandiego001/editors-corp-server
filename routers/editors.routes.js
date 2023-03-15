
module.exports = function (app, upload) {
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
                .then(response => {
                    response ?
                        res.json({
                            "code": 200,
                            "message": "Los proyectos del usuario fueron obtenidos con éxito!",
                            "data": response
                        })
                        :
                        res.json({
                            "code": 300,
                            "message": "Los proyectos del usuario no fueron encontrados"
                        })
                })
                .catch(err => {
                    res.json({
                        "code": 500,
                        "message": "Ocurrió un error al intentar obtener los proyectos del editor"
                    })
                });
        })

        // Crear un proyecto a un editor
        // Anteriormente, desde el cliente, se valida que el nick exista.
        .post(upload.single('video'), async (req, res) => {
            try {
                let { nick, titulo, descripcion } = req.body;
                let file = req.file;
                let data = {
                    nick,
                    titulo,
                    descripcion,
                    "nombreVideo": file.filename
                };

                cProyecto.createNew(data)
                    .then(data => {
                        res.json({
                            "code": 200,
                            "message": "¡El proyecto ha sido subido con éxito!",
                            "data": data
                        })
                    })
                    .catch(err => {
                        res.json({
                            "code": 500,
                            "message": "Ocurrió un error al intentar subir el proyecto",
                            "data": false
                        })
                    });
            } catch (error) {
                res.json({
                    "code": 500,
                    "message": "Ocurrió un error al intentar subir el proyecto",
                    "data": false
                })
            }
        })

        // Actualizar el proyecto de un editor
        .put((req, res) => {
            cProyecto.updateId({ _id: req.body._id }, req.body)
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })

        // Eliminar el proyecto de un editor
        .delete((req, res) => {
            cProyecto.deleteId(req.query)
                .then(data => {
                    res.json({
                        "code": 200,
                        "message": "¡Proyecto eliminado con éxito!",
                        "data": data
                    })
                })
                .catch(err => {
                    res.json({
                        "code": 500,
                        message: "Ocurrió un error al intentar eliminar el proyecto"
                    })
                });
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
    
    // Rutas principales para opinion
    app.route('/opinion')

        // Listar todas las opiniones que le han realizado a un editor
        .get((req, res) => {
            cOpinion.list(req.query)
                .then(data => {
                    console.log({data});
                    res.json({
                        "code": 200,
                        "message": "¡Las opiniones fueron obtenidas con éxito!",
                        data
                    });
                })
                .catch(err => {
                    console.log({err});

                    res.json({
                        "code": 500,
                        "message": "Ocurrió un error en el servidor al intentar traer las opiniones realizadas."
                    });
                })
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
        // Iniciar sesión
        .post((req, res) => {
            cUsuario.logIn(req.body)
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })

    app.route('/usuario/all')
        .get((req, res) => {
            cUsuario.allData(req.query)
                .then(response => {
                    response ?
                        res.json({
                            "code": 200,
                            "message": "¡Usuario encontrado con éxito!",
                            "correo": response["correo"],
                            "contrasena": response["contrasena"],
                            "categorias": response["categorias"],
                            "nombre": response["nombre"],
                            "apellido": response["apellido"],
                            "biografia": response["biografia"]
                        })
                        :
                        res.json({
                            "code": 300,
                            "message": "El usuario no ha sido encontrado"
                        })
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        "code": 500,
                        "message": "Ocurrió un error mientras se intentaba encontrar todos los datos del usuario."
                    })
                })

        })

    // Rutas secundarias para usuario
    app.route('/usuario/datos')

        .get(async (req, res) => {
            try {
                let userData = await cUsuario.nickUser(req.query);
                let userVideos = await cProyecto.list(req.query);

                if (userData && userVideos) {
                    res.json({
                        "code": 200,
                        "message": "¡Usuario encontrado con éxito!",
                        "nombre": userData["nombre"],
                        "apellido": userData["apellido"],
                        "biografia": userData["biografia"],
                        "videos": userVideos
                    });
                } else {
                    res.json({
                        "code": 500,
                        "message": "Ocurrió un error mientras se intentó consultar el usuario mediante el nick en la base de datos."
                    })
                }
            } catch (error) {
                console.log(err);
                res.json({
                    "code": 500,
                    "message": "Ocurrió un error mientras se intentó consultar el usuario mediante el nick en la base de datos."
                })
            }
        })

    app.route('/usuario/busqueda')

        .get((req, res) => {
            cUsuario.searchEditors(req.query.nick)
                .then(data => {
                    if (data.length > 0) {
                        res.json({
                            "code": 200,
                            "message": "Usuarios obtenidos con éxito.",
                            "data": data
                        })
                    } else {
                        res.json({
                            "code": 201,
                            "message": "No se encontraron usuarios con el nickname otorgado."
                        })
                    }
                })
                .catch(err => {
                    console.log("Ocurrió un error al intentar buscar los editores.");
                    console.log(err);
                    res.json({
                        "code": 300,
                        "message": "Ocurrió un error al intentar buscar los editores."
                    })
                });
        })

    app.route('/usuario-verificar-nick')
        // Verificar si ya existe o no un nickname
        .get(async (req, res) => {
            try {
                let nickExists = await cUsuario.nickUser(req.query);

                res.json({
                    "code": 200,
                    "message": "¡Se determinó si el nickname existe o no con éxito!",
                    "data": nickExists
                });
            } catch(e) {
                res.json({
                    "code": 500,
                    "message": "Ocurrió un error mientras se intentaba determinar si el nickname existía o no."
                });
            }
        })

    app.route('/usuario-verificar-correo')
        // Verificar si ya existe o no un correo
        .get(async (req, res) => {
            try {
                let { email } = req.query;
                let correo = {
                    "correo": email
                };
                let emailExists = await cUsuario.verifyEmail(correo);

                res.json({
                    "code": 200,
                    "message": "¡Se determinó si el correo existe o no con éxito!",
                    "data": emailExists
                });
            } catch(e) {
                res.json({
                    "code": 500,
                    "message": "Ocurrió un error mientras se intentaba determinar si el correo existía o no."
                });
            }

        })

    app.route('/usuario-listar')
        // Listar todos los usuarios
        .get((req, res) => {
            cUsuario.list()
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })

}