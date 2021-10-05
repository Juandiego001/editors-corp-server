$(document).ready(() => {

    // Eliminar un trato
    $('#eliminarTrato').submit( event => {
        let idTrato = $('#eIdTrato').val();
    
            if (idTrato == ''){
                alert('Por favor, digita un id.')
            } else {
                let idJson = {
                    _id: idTrato
                };
                
                // Verificamos que el id exista
                $.get('http://localhost:3000/trato-verificar-id', idJson, (data, err) => {

                    // Si ingresa por el condicional es porque efectivamente
                    // se encontró el id
                    if (data != ''){

                        // Se envían los datos a la base de datos
                        $.ajax('http://localhost:3000/trato', {
                                method: 'DELETE',
                                data: JSON.stringify(idJson),
                                contentType: 'application/json',

                                // Si todo funciona correctamente
                                success: data => {
                                    alert('El proyecto se ha eliminado con éxito!');
                                },

                                // Si ocurre un error
                                fail: err => {
                                    alert('Ocurrió un error al intentar eliminar el proyecto.');
                                }
                            });
                    } else {
                        alert('Error. El id digitado no ha sido encontrado.');
                    }
                });
            }

        event.preventDefault();
    });
    

    // Actualizar un trato
    $('#actualizarTrato').submit(event => {
        let idTrato = $('#idTrato').val();
        let datoTitulo = $('#aTitulo').val();
        let datoPrecio = $('#aPrecio').val();
        let datoDescripcion = $('#aDescripcion').val();

        // Se valida que se haya digitado en todos los campos
        if (idTrato != '' && datoTitulo != '' && datoDescripcion != '' && datoPrecio != ''){

            let idJson = {
                _id: idTrato
            };

            // Se valida que el id del trato sea correcto
            $.get('http://localhost:3000/trato-verificar-id', idJson, (data, err) => {

                    // Si ingresa por el condicional es porque efectivamente
                    // se encontró el proyecto
                    if (data != ''){

                        // Datos a enviar organizados en formato JSON
                        let dataJson = {
                            _id: idTrato,
                            titulo: datoTitulo,
                            precio: datoPrecio,
                            descripcion: datoDescripcion
                        };

                        // Se envían los datos a la base de datos
                        $.ajax('http://localhost:3000/trato', {
                                method: 'PUT',                            
                                data: JSON.stringify(dataJson),
                                contentType: 'application/json',

                                // Si todo funciona correctamente
                                success: data => {
                                    alert('El trato se ha actualizado con éxito!');
                                    console.log(data);
                                },

                                // Si ocurre un error
                                fail: err => {
                                    alert('Ocurrió un error al intentar actualizar.');
                                    console.log(err);
                                }
                            });
                    } else {
                        alert('Error. El trato con el id digitado no ha sido encontrado.');
                    }
                });

        } else {
            alert('Error. Por favor digite en todos los campos.');
        }                                

        event.preventDefault();
    });

    // Crear un trato
    $('#crearTrato').submit(event => {
        let nicknameCliente = $('#tNicknameCliente').val();
        let nicknameEditor = $('#tNicknameEditor').val();
        let datoTitulo = $('#titulo').val();
        let datoPrecio = $('#precio').val();
        let datoDescripcion = $('#descripcion').val();

        // Se valida que los campos no estén vacíos
        if (datoTitulo != '' && datoDescripcion != '' && datoPrecio != ''
                && nicknameEditor != '' && nicknameCliente != ''){

            // Verificamos que los nicknames existan
            let nickJsonCliente = {
                nick: nicknameCliente
            };

            $.get('http://localhost:3000/usuario-verificar-nick', nickJsonCliente, (data, err) => {

                // Si ingresa en la condición es porque se ha encontrado un nick
                if (data != ''){

                    // Verificamos el nickname del editor
                    let nickJsonEditor = {
                        nick: nicknameEditor
                    };

                    $.get('http://localhost:3000/usuario-verificar-nick', nickJsonEditor, (dataEditor, err) => {

                        // Si ingresa en la condición es porque se ha encontrado un nick
                        if (dataEditor != ''){

                            let dataJson = {
                                nickEditor: nicknameEditor,
                                nickCliente: nicknameCliente,
                                titulo: datoTitulo,
                                precio: datoPrecio,
                                descripcion: datoDescripcion
                            };

                            // Se envían los datos
                            $.ajax('http://localhost:3000/trato', {
                                method: 'POST',
                                data: JSON.stringify(dataJson),
                                contentType: 'application/json',
                                success: data => {
                                    alert('El trato se ha creado con éxito!');
                                    console.log(data);
                                },
                                fail: err => {
                                    alert('Ocurrió un error al crear el trato.');
                                    console.log(err);
                                }
                            })

                        } else {
                            alert('Error. El nickname del editor no ha sido encontrado.');
                        }
                    });

                } else {
                    alert('Error. El nickname del cliente no ha sido encontrado.');
                }
            });

        } else {
            alert('Error. Por favor ingrese todos los valores.')
        }
    
        event.preventDefault();
    });


    // Listar todos los tratos de un usuario
    $('#listarTrato').submit(event => {
        let nickname = $('#nickname').val();

        let nickJson = {
            nick: nickname
        };

        // Primero verificamos que el nickname ingresado sea correcto
        $.get('http://localhost:3000/usuario-verificar-nick', nickJson, (data, err) => {

            // Si entra en el condicional es porque se encontró el nickname
            if (data != ''){

                // Se listan los tratos
                $.get('http://localhost:3000/trato', nickJson, (data, err) => {

                    // Si NO entra en la condición es porque NO ocurrió un error
                    if (err != 'success'){
                        alert('Ocurrió un error.');
                        console.log(err);

                    } else {

                        // Validación no hecha antes.
                        // Se valida que efectivamente hayan tratos
                        // para el usuario con dicho nick.

                        // Se eliminan los registros anteriores
                        $('.my-3').remove();

                        if (data != ''){
                            alert('Se obtuvieron los registros con éxito.');

                            for (let objetos in data){
                                let divGeneral = document.createElement('div');
                                divGeneral.className = 'w-100 my-3 bg-info';
                                
                                let h3Titulo = document.createElement('h3');
                                h3Titulo.className = 'w-100 text-center text-light py-3 border-light border-bottom';
                                h3Titulo.innerHTML = `Trato con Id ${data[objetos]._id}`;
                                
                                divGeneral.appendChild(h3Titulo);
            
                                let divContainer = document.createElement('div');
                                divContainer.className = 'w-100 m-0 p-0';
            
                                let keysObjetos = Object.keys(data[objetos]);
            
                                // Se crean los campos
                                for (let key in keysObjetos){
                                    let divCampo = document.createElement('div');
                                    divCampo.className = 'w-100 row no-gutters py-2 text-light border-bottom border-light';
            
                                    let h4Campo = document.createElement('h4');
                                    h4Campo.className = 'col m-0';
                                    h4Campo.innerHTML = keysObjetos[key];
            
                                    let h4Valor = document.createElement('h4');
                                    h4Valor.className = 'col m-0';
                                    h4Valor.innerHTML = data[objetos][keysObjetos[key]];
            
                                    divCampo.appendChild(h4Campo);
                                    divCampo.appendChild(h4Valor);
                                    divContainer.appendChild(divCampo);
                                }                    
            
                                divGeneral.appendChild(divContainer);
            
                                $('#seccionListar').append(divGeneral);
                            }
                        } else {
                            alert('No hay tratos registrados para el nick digitado.');
                        }
                    }
                });
            } else {
                alert('Error. El nickname no ha sido encontrado.');
            }
        });        

        event.preventDefault();
    });


});