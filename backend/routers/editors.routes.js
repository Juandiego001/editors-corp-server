'use strict';

const cors = require('cors');

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
            cProyecto.updateId({_id: req.body._id}, req.body)
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
            cPublicacion.updateId({_id: req.body._id}, req.body)
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
            cPublicacion.searchId({_id: req.query._id})
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

        // Para iniciar sesión
        .get((req, res) => {
            cUsuario.logIn(req)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.send(err)
                });
        })

        // Para registrarse
        .post((req, res) => {            
            cUsuario.createNew(req.body)
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })

        // Para actualizar el usuario
        .put((req, res) => {
            cUsuario.updateNick({nick: req.body.nick}, req.body)
                .then(data => res.send(data))
                .catch(err => res.send(err));
        })

        // Para eliminar un usuario
        .delete((req, res) => {
            cUsuario.deleteNick({nick: req.body.nick})
                .then(data => res.send(data))
                .catch(err => res.send(err));
        });
    
    // Rutas secundarias para usuario
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



}