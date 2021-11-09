$(document).ready(() => {

    // Eliminar una publicación
    $('#eliminarPublicacion').submit( event => {
        let idPublicacion = $('#eIdPublicacion').val();
    
            if (idPublicacion == ''){
                alert('Por favor, digita un id.')
            } else {
                let idJson = {
                    _id: idPublicacion
                };
                
                // Verificamos que el id exista
                $.get('http://localhost:3000/publicacion-verificar-id', idJson, (data, err) => {

                    // Si ingresa por el condicional es porque efectivamente
                    // se encontró el id
                    if (data != ''){

                        // Se envían los datos a la base de datos
                        $.ajax('http://localhost:3000/publicacion', {
                                method: 'DELETE',
                                data: JSON.stringify(idJson),
                                contentType: 'application/json',

                                // Si todo funciona correctamente
                                success: data => {
                                    alert('La publicación se ha eliminado con éxito!');
                                },

                                // Si ocurre un error
                                fail: err => {
                                    alert('Ocurrió un error al intentar eliminar la publicación.');
                                }
                            });
                    } else {
                        alert('Error. El id digitado no ha sido encontrado.');
                    }
                });
            }

        event.preventDefault();
    });
    

    // Actualizar una publicación
    $('#actualizarPublicacion').submit(event => {
        let idPublicacion = $('#idPublicacion').val();
        let datoTitulo = $('#aTitulo').val();
        let datoDescripcion = $('#aDescripcion').val();

        // Se valida que se haya digitado en todos los campos
        if (idPublicacion != '' && datoTitulo != '' && datoDescripcion != ''){

            let idJson = {
                _id: idPublicacion
            };

            // Se valida que el id de la publicación sea correcto
            $.get('http://localhost:3000/publicacion-verificar-id', idJson, (data, err) => {

                    // Si ingresa por el condicional es porque efectivamente
                    // se encontró la publicacion
                    if (data != ''){

                        // Datos a enviar organizados en formato JSON
                        let dataJson = {
                            _id: idPublicacion,
                            titulo: datoTitulo,
                            descripcion: datoDescripcion
                        };

                        // Se envían los datos a la base de datos
                        $.ajax('http://localhost:3000/publicacion', {
                                method: 'PUT',                            
                                data: JSON.stringify(dataJson),
                                contentType: 'application/json',

                                // Si todo funciona correctamente
                                success: data => {
                                    alert('La publicacion se ha actualizado con éxito!');
                                    console.log(data);
                                },

                                // Si ocurre un error
                                fail: err => {
                                    alert('Ocurrió un error al intentar actualizar.');
                                    console.log(err);
                                }
                            });
                    } else {
                        alert('Error. La publicación con el id digitado no ha sido encontrada.');
                    }
                });

        } else {
            alert('Error. Por favor digite en todos los campos.');
        }                                

        event.preventDefault();
    });

    // Crear publicacion
    $('#crearPublicacion').submit(event => {
        let datoTitulo = $('#titulo').val();
        let datoDescripcion = $('#descripcion').val();
        let datoAdjunto = $('#adjunto')[0].files[0];

        let dataForm = new FormData();
        dataForm.append('adjunto', datoAdjunto);
        dataForm.append('titulo', datoTitulo);
        dataForm.append('descripcion', datoDescripcion);

        // console.log("Data form: ");
        // console.log(dataForm);
        // console.log("Valores de Data form: ");
        // console.log(dataForm.getAll('adjunto'));
        // console.log("Dato adjunto: ");
        // console.log(datoAdjunto);

        // Se valida que los campos no estén vacíos
        if (datoTitulo != '' && datoDescripcion != ''){

            // console.log($('#crearPublicacion')[0]);
            // console.log(datoAdjunto);

            // Prueba
            // $.ajax('http://localhost:3000/publicacion', {
            //     method: 'POST',
            //     data: dataForm,
            //     cache: false,
            //     processData: false,
            //     contentType: false,

            //     // Si todo funciona correctamente
            //     success: data => {
            //         alert('El adjunto se ha enviado junto con la publicación con éxito!');
            //         console.log(data);
            //     },

            //     // Si ocurre un error
            //     fail: err => {
            //         alert('Ocurrió un error al intentar enviar el adjunto.');
            //         console.log(err);
            //     }
            //   });

            // let dataJson = {
            //     titulo: datoTitulo,
            //     descripcion: datoDescripcion,
            //     adjunto: datoAdjunto,
            //     valida: true
            // };

            // Se envian los datos sin contemplar el adjunto o archivo
            // $.ajax('http://localhost:3000/publicacion', {
            //     method: 'POST',                            
            //     data: JSON.stringify(dataJson),
            //     contentType: 'application/json',

            //     // Si todo funciona correctamente
            //     success: data => {
            //         alert('La publicacion se ha creado con éxito!');
            //         console.log(data);
            //     },

            //     // Si ocurre un error
            //     fail: err => {
            //         alert('Ocurrió un error al intentar crear la publicación.');
            //         console.log(err);
            //     }
            // });

            // Se envia el adjunto de la publicacion
            $.ajax('http://localhost:3000/video', {
                method: 'POST',
                data: dataForm,
                cache: false,
                contentType: false,
                processData: false,

                // Si todo funciona correctamente
                success: data => {
                    alert('El adjunto se ha enviado junto con la publicación con éxito!');
                    console.log(data);
                },

                // Si ocurre un error
                fail: err => {
                    alert('Ocurrió un error al intentar enviar el adjunto.');
                    console.log(err);
                }
              });

        } else {
            alert('Error. Por favor ingrese todos los valores.')
        }

        event.preventDefault();

    });


    // Listar todos las publicaciones
    $('#listarPublicacion').click(() => {
        $.get('http://localhost:3000/publicacion', (data, err) => {

            if (err != 'success'){
                alert('Ocurrió un error al intentar listar los usuarios.')
            } else {
                alert('Se obtuvieron los registros con éxito.');
                // Se eliminan los registros anteriores
                $('.my-3').remove();

                for (let objetos in data){
                    let divGeneral = document.createElement('div');
                    divGeneral.className = 'w-100 my-3 bg-info';
                    
                    let h3Titulo = document.createElement('h3');
                    h3Titulo.className = 'w-100 text-center text-light py-3 border-light border-bottom';
                    h3Titulo.innerHTML = `Publicacion con Id ${data[objetos]._id}`;
                    
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
            }
        })



        // $.get('http://localhost:3000/videos/6189a0e8bf1e185c44e6ec36', (data, err) => {

        //     if (err != 'success') {
        //         alert('Ha ocurrido un error');
        //     } else {
        //         alert('Se han obtenido los videos con éxito!');
        //         console.log("Intentando obtener los videos");
        //         console.log(data);

        //         let contenedorVideo = document.createElement('video');
        //         let sourceContenedorVideo = document.createElement('source');
        //         sourceContenedorVideo.setAttribute('id', 'sourcePrueba');
        //     }
        // })

        $.ajax('http://localhost:3000/videos/6189a0e8bf1e185c44e6ec36', {
                method: 'GET',
                headers: {range: 'bytes=0-'},

                // Si todo funciona correctamente
                success: data => {
                    alert('Se recibió el video con éxito');
                    console.log("Intentando obtener los videos");
                    console.log(typeof data);

                    let contenedorVideo = document.createElement('video');
                    let sourceContenedorVideo = document.createElement('source');
                    sourceContenedorVideo.setAttribute('id', 'sourcePrueba');
                    
                },

                // Si ocurre un error
                fail: err => {
                    alert('Ocurrió un error al intentar recibir el video.');
                    console.log(err);
                }
              });

    });


});